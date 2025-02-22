import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/user/Sidebar";
import PostOfTheDay from "../../Components/user/PostOfTheDay";
import CategorySection from "../../Components/user/CategorySection";
import PopularPost from "../../Components/user/PopularPost";
import HomeAbout from "../../Components/user/HomeAbout";
import UserStats from "../../Components/user/UserStats";
import NewsletterUpdate from "../../Components/user/NewsletterUpdate";

function Index() {
  return (
    <>
      <div>
        <PostOfTheDay />
        <CategorySection />
        <PopularPost />
        <HomeAbout />
        <UserStats />
        <NewsletterUpdate />
      </div>
    </>
  );
}

export default Index;
