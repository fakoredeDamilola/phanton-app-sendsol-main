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
    title: <TitleBox>Owned NFT's / Grow Humidity </TitleBox>,
    content: (
      <ContentBox>
        See all your gardens and total minted khlros coins for each day your tower is staked.
        Receive real time updates of your grow room humidity
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
    title: <TitleBox>Real Time Temperature</TitleBox>,
    content: (
      <ContentBox>
        Monitor the grow room temperature and adjust your grow temperatures based on your ideal
        settings
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
    title: <TitleBox>Real Time PH</TitleBox>,
    content: (
      <ContentBox>
        PH is arguably one of the most important variables when it comes to growing hydroponically.
        You can use the Garden Doctor settings on the data tab to set your PH range and allow the
        doctor to do the rest.
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
    title: <TitleBox>Minting Khlros</TitleBox>,
    content: (
      <ContentBox>
        Khlros, or green coin will be the digital currency that connects growers and gardeners all
        around the world through sustainability. You can your digital NFT garden to mint khrlos
        daily. Subscription required
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
    target: ".waterGraph",
    title: <TitleBox> Water Level Graph</TitleBox>,
    content: (
      <ContentBox>
        Use the water level graph to monitor the real time water level of your bucket or reservoir.
        You can use the Garden Doctor settings on the data tab to set your water level range and
        allow the doctor to do the rest.
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
    target: ".dataInput",
    title: <TitleBox> Add Your Mac Address</TitleBox>,
    content: <ContentBox></ContentBox>,
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },
  {
    target: ".showMacAddress",
    title: <TitleBox>Mac Address Shows here</TitleBox>,
    content: <ContentBox></ContentBox>,
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },
  {
    target: ".statusOfConnection",
    title: <TitleBox>Status of Connection</TitleBox>,
    content: <ContentBox></ContentBox>,
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },
  {
    target: ".addExtraData",
    title: <TitleBox>Add Extra Data</TitleBox>,
    content: <ContentBox></ContentBox>,
    locale: {
      next: <NextBtn />,
      back: <BackBtn />,
      close: <CloseBtn />,
      last: <DoneBtn />,
      skip: <SkipBtn />,
    },
  },
];
