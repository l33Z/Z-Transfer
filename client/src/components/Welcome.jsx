import { useEffect, useState } from "react";

import Services from "./Services";
import About from "./Aboutus";
import useFetch from "../hooks/useFetch.jsx";

import "./welcome.css";
import "./navbar.css";
import "./transcationlist.css";

import gify7 from "../assets/7.gif";
import logo from "../assets/icon.png";
import elogo from "../assets/e.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ethers } from "ethers";
import contartcAbi from "../contratct/abi";
const contartctAddress = "0x7dbAe833c3a07A3bA4505FDfeD4AfeCA8490eE9b";



const Welcome = () => {
  const [totalTranscation, setTotalTranscation] = useState(0);
  const [connected, setconnected] = useState(false);
  const [structureData, setStructureData] = useState([]);

  var signer;
  var provider;

  const [statusBtn, setstatusBtn] = useState("Connect 🔒");
  const [account, setAccount] = useState("0x00.......0000");

  // ------------------- Handling Account Changing -------------------
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      };
    }
  });

  // ------------------- Connect To Metamask -------------------
  const metaConnection = async () => {
    if (window.ethereum) {
      handleAccountChange();
      TotalTranscationValueCount();
      const dummyData = await transactionProcess();
      setStructureData(dummyData);
      setconnected(true);
    } else {
      toast.error("👉 First Install Metamask", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // ----------------- Handle Account Change ------------------
  const handleAccountChange = async () => {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setstatusBtn("Connected");
    } else {
      console.log("not connected !!");
      return;
    }
  };

  // --------------- Get Transaction Count ---------------
  const TotalTranscationValueCount = async () => {
    if (window.ethereum) {
      const myContratct = new ethers.Contract(
        contartctAddress,
        contartcAbi,
        signer
      );
      var transactionCount = await myContratct.totalTransactionCount();
      console.log(transactionCount.toNumber());
      setTotalTranscation(transactionCount.toNumber());
    } else {
      console.log("TotalTranscationValueCount Error");
    }
  };

  // --------------- Form  Details ---------------
  const [formDetails, setFormDetails] = useState({
    address: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChanges = (e) => {
    setFormDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --------------- Send Ether ---------------
  const sendEther = async (e) => {
    if (
      formDetails.address != "" &&
      formDetails.amount != "" &&
      formDetails.keyword != "" &&
      formDetails.message != ""
    ) {
      e.preventDefault();
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();

      const myContratct = new ethers.Contract(
        contartctAddress,
        contartcAbi,
        signer
      );
      const finalAmount = ethers.utils.parseEther(formDetails.amount);

      const tx = {
        from: account,
        to: formDetails.address,
        value: finalAmount._hex,
        gasLimit: ethers.utils.hexlify(21000),
        gasPrice: ethers.utils.hexlify(parseInt(await provider.getGasPrice())),
      };

      const Txhash = signer.sendTransaction(tx);

      // const Txhash = await ethereum.request({
      //   method: "eth_sendTransaction",
      //   params: [
      //     {
      //       from: account,
      //       to: formDetails.address.toString(),
      //       value: ethers.utils.parseEther(formDetails.amount.toString()),
      //       nonce: await provider.getTransactionCount(DefaultAccount, "latest"),
      //       gasLimit: ethers.utils.hexlify(10000),
      //       gasPrice: ethers.utils.hexlify(
      //         parseInt(await provider.getGasPrice())
      //       ),
      //     },
      //   ],
      // });
      // console.log("====================================");
      // console.log(Txhash);
      // console.log("====================================");

      try {
        const trnsactionHash = await myContratct.addTransaction(
          formDetails.address,
          ethers.utils.parseEther(formDetails.amount),
          formDetails.message,
          formDetails.keyword
        );

        formDetails.address = "";
        formDetails.amount = "";
        formDetails.keyword = "";
        formDetails.message = "";
      } catch (e) {
        toast.error("Something Went Wrong !!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(e);
      }
    } else {
      toast.error("Fill All Details ✅", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // --------------- Converting Address ---------------
  const ConvertAddress = (address) => {
    return address.slice(0, 8) + "..." + address.slice(address.length - 8);
  };

  // --------------- TransactionCard ---------------
  const TransactionCard = (t) => {
    const gifUrl = useFetch(t.Tkeyword);

    return (
      <div className="Tcard" key={t.Ttime}>
        <div className="basicInfo">
          <a
            href={`https://goerli.etherscan.io/address/${t.senderAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            <p>From : {ConvertAddress(t.senderAddress)}</p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${t.receiverAddressTra}`}
            target="_blank"
            rel="noreferrer"
          >
            <p>To : {ConvertAddress(t.receiverAddressTra)}</p>
          </a>
          <p id="amountt">Amount : {t.valueOfTranscation} ETH</p>
        </div>
        <div className="gif">
          <img src={gifUrl || gify7} alt="gifImg" />
          <h2 id="timeStamp">{t.Ttime}</h2>
        </div>
        {/* <div className="keyMessage">
          <h2>Message : {t.Tmessage}</h2>
          <h2>Keyword : {t.Tkeyword}</h2>
        </div> */}
      </div>
    );
  };

  // --------------- TransactionList ---------------
  const transactionProcess = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const myContratct = new ethers.Contract(
      contartctAddress,
      contartcAbi,
      signer
    );

    const allTransactions = await myContratct.allTransactionsList();

    const structTrnansactions = allTransactions.map((transaction) => ({
      senderAddress: transaction.sender,
      receiverAddressTra: transaction.receiver,
      valueOfTranscation: parseInt(transaction.value._hex) / 10 ** 18,
      Tmessage: transaction.message,
      Tkeyword: transaction.keyword,
      Ttime: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
    }));

    return structTrnansactions;
  };

  return (
    <>
      <div className="main" id="Home">
        <div className="header">
          <div className="leftside">
            <img src={logo} alt="icon" />
            <div className="cname">Transfer</div>
          </div>
          <div className="rightside">
            <ul>
              <li>
                <a href="#Home">Home</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#aboutus">About us</a>
              </li>
              <li>
                <a href="#Transactions">Transactions</a>
              </li>
            </ul>
            {statusBtn == "Connect 🔒" ? (
              <button className="loginbtn" onClick={metaConnection}>
                Connect 🔒
              </button>
            ) : (
              <button className="loginbtn" id="connected">
                Connected
              </button>
            )}

            <ToastContainer
              toastStyle={{
                backgroundColor: "#E74C3C",
                color: "#FFFFFF",
                fontSize: "18px",
              }}
              position="top-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>

        {/*------------------------------ Hero Section ------------------------------*/}
        <div className="heroSection">
          <div className="leftSide">
            <div className="text">
              <h2>Send Crypto Across The World</h2>
              <p>
                Explore the crypto world. Transfer The crypto currencies with
                Z-Trnasfer
              </p>
              <h3>Total Transactions : {totalTranscation}</h3>
            </div>
            <div className="infoCard">
              <img src={elogo} alt="elogo" />
              <div className="acountInfo">
                <h5>Address : {account}</h5>
                <h1>Ethereum : Goerli</h1>
              </div>
            </div>
          </div>

          <div className="rightSide">
            <div className="form">
              <form action="">
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  id="address"
                  required
                  autoComplete="off"
                  onChange={handleChanges}
                />
                <input
                  type="number"
                  placeholder="Amount (ETH)"
                  name="amount"
                  id="amount"
                  required
                  autoComplete="off"
                  step="0.00001"
                  min="0"
                  onChange={handleChanges}
                />
                <input
                  type="text"
                  placeholder="Keyword (For Gif)"
                  name="keyword"
                  id="keyword"
                  required
                  autoComplete="off"
                  onChange={handleChanges}
                />
                <input
                  type="text"
                  placeholder="Message"
                  name="message"
                  id="message"
                  required
                  autoComplete="off"
                  onChange={handleChanges}
                />
                <div className="btn">
                  <button id="sendBtn" onClick={sendEther}>
                    Send Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/*------------------------------ Services Section ------------------------------*/}
        <Services />

        {/*------------------------------ Services Section ------------------------------*/}
        <div className="TransactionSection" id="Transactions">
          <h2 id="TransactionListTitle">Latest Transactions</h2>
          {connected === false ? (
            <div className="CoonectPlz">
              <h1>🫵 Connect To Metamask To See Transactions 🫵</h1>
            </div>
          ) : (
            <div className="lists">
              {structureData.reverse().map((t, i) => (
                <TransactionCard key={i} {...t} />
              ))}
            </div>
          )}
        </div>

        {/*------------------------------ About Section ------------------------------*/}
        <About />
      </div>
    </>
  );
};

export default Welcome;
