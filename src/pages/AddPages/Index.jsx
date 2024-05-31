import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Navigation from "../../components/layout/Navigation/Index";
import Footer from "../../components/layout/Footer";
import { useGetAll } from "../../Hooks";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../pages/PageDoesNotExists/NotFoundPage";

function KnowingFairseed({ title, content, navbar, footer }) {
  const { slug } = useParams();
  const [contentData, setContentData] = useState(null); // Initialize contentData as null
  const { data, error } = useGetAll({
    key: `/campaign/slug/${slug}`,
    select: (data) => data?.data?.data,
  });

  useEffect(() => {
    if (data) {
      setContentData(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

  if (!contentData && !error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !contentData?.show_page) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {contentData?.show_navbar && <Navbar />}
      <div className="w-full pb-4">
        <Navigation label={contentData?.title} heading={contentData?.title} />
      </div>

      <div
        className="pt-12 flex flex-col text-start text-ellipsis font-[satoshi] max-w-[1920px] max-desktop:w-[718px] max-tablet:w-[370px] gap-[10px] px-10 max-desktop:px-2 desktop:text-[22px] text-[satoshi] max-tablet:px-2"
        dangerouslySetInnerHTML={{ __html: contentData?.content }}
        style={{ whiteSpace: "pre-line", fontFamily: "satoshi" }}
      ></div>
      {contentData?.show_footer && <Footer />}
    </div>
  );
}

export default KnowingFairseed;
