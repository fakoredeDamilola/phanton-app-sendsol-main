import React from "react";
import BackBtn from "./components/BackBtn";
import CloseBtn from "./components/CloseBtn";
import ContentBox from "./components/ContentBox";
import DoneBtn from "./components/DoneBtn";
import NextBtn from "./components/NextBtn";
import SkipBtn from "./components/SkipBtn";
import TitleBox from "./components/TitleBox.jsx";

export const phantomStep = [
  {
    target: ".Null",
    title: <TitleBox>Null</TitleBox>,
    content: "I purposely left this step empty",
  },

  {
    target: ".humidity",
    title: <TitleBox>Order / Trade Timer </TitleBox>,
    content: (
      <ContentBox>
        Trade immediately starts when you get to this screen. There is a time limit of 15mins for
        you to interact with this interface.
      </ContentBox>
    ),
    placement: "right",
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },
  {
    target: ".temperature",
    title: <TitleBox>Message Box</TitleBox>,
    content: (
      <ContentBox>
        You can message the vendor anytime during the trade. This keeps communication going
        throughout the trading process.
      </ContentBox>
    ),
    placement: "right",
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },

  {
    target: ".ph",
    title: <TitleBox> Order Information</TitleBox>,
    content: (
      <ContentBox>
        Information about your / trade with the vendor are shown here. Details like Amount to pay,
        Pric and the Amount of tokens you'll recieve.
      </ContentBox>
    ),
    placement: "right",
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },

  {
    target: ".KHLR",
    title: <TitleBox> Seller's Account Information</TitleBox>,
    content: (
      <ContentBox>
        Immediately the seller approves this trade from his end by locking up the token on the
        system, their account information is shown to you to make payment. .
      </ContentBox>
    ),
    placement: "right",
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },

  /*
  {
    target: ".CoinReleaseDispute",
    title: <TitleBox> Coin Release and Dispute</TitleBox>,
    content: (
      <ContentBox>
        The system will release the token immediately the seller approves
        payments from you. Else, you can start disputes in case the trade goes
        wrong.
      </ContentBox>
    ),
    placement: "right",
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },

  {
    target: ".NotSeller",
    title: <TitleBox> Notify Seller </TitleBox>,
    content: (
      <ContentBox>
        After you have successfully made payment, click on NOTIFY SELLER so that
        the system will pass the message across. Before payments are made, you
        can cancel i you found trade unsuitable.
      </ContentBox>
    ),
    placement: "right",
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },

  {
    target: ".TrxnCompleted",
    title: <TitleBox> Transaction Complete!</TitleBox>,
    content: (
      <ContentBox>
        If there's no dispute between you and the vendors, the system releases
        the tokens to your wallet immediately to mark the trade was completed.
      </ContentBox>
    ),
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },
  */
];
