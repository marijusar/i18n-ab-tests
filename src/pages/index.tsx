import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";

const inter = Inter({ subsets: ["latin"] });

const useFallbackNSTranslation = (testId: number, namespace: string) => {
  const ns = [`${namespace}.${testId}`, namespace];
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

export default function Home({ testId }: { testId: number }) {
  const { t } = useFallbackNSTranslation(testId, "landing");
  return (
    <div>
      <p>{t("Landing.Heading")}</p>
      <p>{t("Landing.Footer")}</p>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const testId = 123;
  const namespace = "landing";
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        `${namespace}.${testId}`,
        namespace,
      ])),
      testId,
    },
  };
}
