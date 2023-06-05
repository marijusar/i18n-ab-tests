import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";

const inter = Inter({ subsets: ["latin"] });

const useFallbackNSTranslation = () => {
  const ns = ["landing", "footer"];
  const { t } = useTranslation(ns);

  const fallbackT = (key: string) => {
    const translatedKey = t(key);

    if (translatedKey === key) {
      return t(key, { ns: ns[1] });
    }

    return translatedKey;
  };

  return { t: fallbackT };
};

export default function Home() {
  const { t } = useFallbackNSTranslation();
  return <p>{t("Landing.Heading")}</p>;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["footer", "landing"])),
    },
  };
}
