import { Helmet } from "react-helmet-async";
import Hero from "./hero";
import QuickStats from "./QuickStats";
import ShowDetails from "./ShowDetails";

export default function Home() {
  return <>
  <Helmet>
      <title>الرئيسية | Educational Platform</title>
      <meta
        name="description"
        content="الصفحة الرئيسية للطالب في المنصة التعليمية"
      />
  </Helmet>
 <Hero/>
 <QuickStats/>
 <ShowDetails/>
  </>
}