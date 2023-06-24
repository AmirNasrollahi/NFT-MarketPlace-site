"use client"

import "./globals.css";
// import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./main.module.css";
import Head from "next/head";

import Image from "next/image";
import pictures1 from '../pictures/nft1.jpg'
import pictures3 from '../pictures/nft3.jpg'
import pictures4 from '../pictures/nft4.jpg'

function kryptoAmirMarketplace({ Component, pageProps }) {
  
  // useClient();
  return (
    
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        {/* <link rel="stylesheet" href="main.css" /> */}
      </Head>
      <header>
        <div className={styles.logodiv}>
          <img src="#" alt="" />
          <h3>NFT-MarketPlace</h3>
        </div>
        <div className={styles.linksdiv}>
          <Link href="/" className={styles.links}>
            Market
          </Link>

          <Link href="/mint-item" className={styles.links}>
            Mint
          </Link>

          <Link href="/my-nfts" className={styles.links}>
            My NFTs
          </Link>

          <Link href="/account-dashboard" className={styles.links}>
            Account Dashboard
          </Link>
        </div>
        <div className={styles.Searchdiv}>
          <input
            type="search"
            className={styles.searchbox}
            placeholder="Search For Items"
          />
        </div>
        <div className={styles.btndiv} style={{ color: "aliceblue" }}>
          <button id={styles.btn}>Connect Wallet</button>
          {/* <button id="btn">load</button> */}
        </div>
        </header>      
        
      <section>
        <div className={styles.titlenfts}>
          <h3 className={styles.title}>Active & upcoming</h3>
          <hr className={styles.line} />
        </div>
        <div className={styles.divmaincontainer}>
          <div className={styles.offertitlecontentsdiv}>
            <div className={styles.offercontents}>
              <Image
                src={pictures1}
                className={styles.tokenslg}
                alt=""
                width={100}
                height={100}
              />
              <p className={styles.rightcontents}></p>
              <h3 id="tmreward" className={styles.font}>
                The Working Dead
              </h3>
              <p className={styles.rightcontents}></p>
              <h3 className={styles.cldivs}>Starts</h3>
              <h3 className={styles.rightcontents}>Price</h3>
              <h3 className={`${styles.cldivs} ${styles.top}`}>Jun 12</h3>
              <h3
                className={`${styles.rightcontents} ${styles.top}`}
                id="stakeamt"
              >
                0.04 ETH
              </h3>
              <button className={styles.btn}>BUY NFT</button>
            </div>
          </div>
          <div className={styles.offertitlecontentsdiv}>
            <div className={styles.offercontents}>
              <Image
                src={pictures1}
                className={styles.tokenslg}
                alt=""
                width={100}
                height={100}
              />
              <p className={styles.rightcontents}></p>
              <h3 id="tmreward" className={styles.font}>
                The Working Dead
              </h3>
              <p className={styles.rightcontents}></p>
              <h3 className={styles.cldivs}>Starts</h3>
              <h3 className={styles.rightcontents}>Price</h3>
              <h3 className={`${styles.cldivs} ${styles.top}`}>Jun 12</h3>
              <h3
                className={`${styles.rightcontents} ${styles.top}`}
                id="stakeamt"
              >
                0.045 ETH
              </h3>
              <button className={styles.btn}>BUY NFT</button>
            </div>
          </div>
          <div className={styles.offertitlecontentsdiv}>
            <div className={styles.offercontents}>
              <Image
                src={pictures3}
                className={styles.tokenslg}
                alt=""
                width={100}
                height={100}
              />
              <p className={styles.rightcontents}></p>
              <h3 id="tmreward" className={styles.font}>
                The Working Dead
              </h3>
              <p className={styles.rightcontents}></p>
              <h3 className={styles.cldivs}>Starts</h3>
              <h3 className={styles.rightcontents}>Price</h3>
              <h3 className={`${styles.cldivs} ${styles.top}`}>Jun 12</h3>
              <h3
                className={`${styles.rightcontents} ${styles.top}`}
                id="stakeamt"
              >
                0.8 ETH
              </h3>
              <button className={styles.btn}>BUY NFT</button>
            </div>
          </div>
          <div className={styles.offertitlecontentsdiv}>
            <div className={styles.offercontents}>
              <Image
                src={pictures4}
                className={styles.tokenslg}
                alt=""
                width={100}
                height={100}
              />
              <p className={styles.rightcontents}></p>
              <h3 id="tmreward" className={styles.font}>
                The Working Dead
              </h3>
              <p className={styles.rightcontents}></p>
              <h3 className={styles.cldivs}>Starts</h3>
              <h3 className={styles.rightcontents}>Price</h3>
              <h3 className={`${styles.cldivs} ${styles.top}`}>Jun 12</h3>
              <h3
                className={`${styles.rightcontents} ${styles.top}`}
                id="stakeamt"
              >
                1.5 ETH
              </h3>
              <button className={styles.btn}>BUY NFT</button>
            </div>
          </div>
        </div>
        
       {/* <div style={{width:100,height:200,marginLeft:150,marginTop:150}}><h1 style={{color:'white',marginTop:100,marginLeft:100,fontSize:50}} > No NFT in Market </h1></div>  */}

      </section>
      <component {...pageProps} />
    </div>
  );
}

export default kryptoAmirMarketplace;
