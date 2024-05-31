import React from "react";
import Navbar from "../../../components/layout/Navbar";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "../../../components/layout/Navigation/Index";
import Footer from "../../../components/layout/Footer";

function PrivacyPolicy() {
  const navigate = useNavigate();
  const imageStyle = {
    borderRadius: "2%",
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <div className="w-full pb-10">
        <Navigation label={"Privacy-Policy"} heading={"Privacy Policy"} />
      </div>

      <br />
      <div
        className=" flex-row text-left  max-w:[1920px] max-desktop:w-[718px] max-tablet:w-[400px] gap-[10px] px-12 max-desktop:px-2 max-tablet:px-6"
        style={{ whiteSpace: "pre-line", fontFamily: "satoshi" }}
      >
        <h1 className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-bold underline decoration-solid ">
          FairSeed Technology Foundation - Privacy Policy
        </h1>
        <br />

        <span
          className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Last Updated: 10-08-2023
          <br />
          <br />
        </span>

        <div className="pl-0">
          <ul>
            <li className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  ">
              <span className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1">
                Welcome to FairSeed Technology Foundation ("FairSeed," “FTF”,
                "we," "us," or "our"). We are committed to protecting the
                privacy and security of your personal information. This Privacy
                Policy explains how we collect, use, and safeguard your
                information when you use our digital crowd-funding platform
                focused on educational causes. By using our platform, you
                consent to the practices described in this Privacy Policy
                <br />
                <br />
              </span>
            </li>
          </ul>

          <ul>
            <li className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  ">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-medium">
                A.{" "}
              </span>
              <span
                className=" text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-bold underline  underline-offset-4"
                style={{ paddingBottom: "8px" }}
              >
                Information We Collect:
                <br />
                <br />
              </span>
            </li>
          </ul>

          <ul>
            <li className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  ">
              <span className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1">
                We may collect the following information:
                <br />
                <br />
              </span>
            </li>
          </ul>

          <ul>
            <li className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-bold ">
                1. Campaign Creator/ Beneficiary:
              </span>
              <span className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1">
                {" "}
                Utilize our built-in tools and resources to reach a wider
                audience. Share your campaign across social media, email, and
                other platforms to generate buzz and attract supporters.
                <br />
                <br />
              </span>
            </li>
          </ul>

          <ul>
            <li className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-bold ">
                2. Donor:
              </span>
              <span className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1">
                {" "}
                We may collect your PAN to comply with government norms and
                whenever asked we may share it with government authorities.
                <br />
                <br />
              </span>
            </li>
          </ul>

          <ul>
            <li className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  ">
              <span className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1">
                Types of Information we may collect:
                <br />
                <br />
              </span>
            </li>
          </ul>
        </div>

        <div
          className="pl-0"
          style={{ whiteSpace: "pre-line", fontFamily: "satoshi" }}
        >
          <ol start="1" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Personal Information:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                This includes your name, email address, postal address, phone
                number, and any other information you provide to us during the
                account registration and campaign creation process. Hence, when
                you create an account, make a donation, or interact with our
                platform, we may collect personal information such as your name,
                email address, postal address, phone number, and other relevant
                details.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="2" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Payment Information:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                If you make a donation to a campaign through our platform, we
                collect payment information such as credit card details, PayPal
                account information, or other financial information necessary to
                process your donation. This information is securely processed by
                our third-party payment processors.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="3" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Campaign Information:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                Information related to the educational cause for which you are
                seeking crowd-funding, including details about the project,
                images, videos, and other content you upload. Hence, if you
                create a campaign or support a campaign, we may collect
                information related to the campaign, including campaign details,
                images, videos, and descriptions.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="4" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Communications:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                When you communicate with us through email, messages, or other
                channels, we may collect and store those communications.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="5" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Technical Information & Usage Data:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                We may automatically collect technical information such as your
                IP address, browser type, device information, and usage data
                when you interact with our platform.
                <br />
                <br />
              </span>
            </li>
          </ol>
        </div>

        <ul>
          <li className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  ">
            <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-medium">
              B.{" "}
            </span>
            <span
              className=" text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-bold underline  underline-offset-4"
              style={{ paddingBottom: "8px" }}
            >
              {" "}
              How We Use Your Information:
              <br />
              <br />
            </span>
          </li>
        </ul>

        <div
          className="pl-0"
          style={{ whiteSpace: "pre-line", fontFamily: "satoshi" }}
        >
          <ol start="1" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Providing Services:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                In order to facilitate donations, campaigns, and interactions on
                our platform such as to create and maintain your account,
                process your incoming and outgoing donations, and enable
                communication between campaign creators (beneficiaries) and the
                donors.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="2" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Communication:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                To send you updates about campaigns, impact reports, status
                updates, newsletters, and information related to our platform
                and other relevant information. You can manage your
                communication preferences in your account settings.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="3" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Improvement:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                To enhance, update and improve our platform, features, services,
                and user experience based on usage patterns and feedback.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="4" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Security:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                To ensure unauthorized access, detect and prevent fraud and any
                kind of illegal activities, and protect the integrity of our
                platform and comply with legal obligations.
                <br />
                <br />
              </span>
            </li>
          </ol>
        </div>

        <ul>
          <li className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  ">
            <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-medium">
              C.{" "}
            </span>
            <span
              className=" text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-bold underline  underline-offset-4"
              style={{ paddingBottom: "8px" }}
            >
              {" "}
              Sharing Your Information:
              <br />
              <br />
            </span>
          </li>
        </ul>

        <span
          className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
          style={{ fontFamily: "satoshi" }}
        >
          We may share your information with:
          <br />
          <br />
        </span>

        <div
          className="pl-0"
          style={{ whiteSpace: "pre-line", fontFamily: "satoshi" }}
        >
          <ol start="1" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Campaign Creators / Beneficiaries:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                If you support a campaign, your name and donation amount may be
                visible to the campaign creator. Hence, your name and donation
                amount may be shared with the campaign creator, unless you
                choose to remain anonymous.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="2" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Third-Party Service Providers:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                We may share your information with trusted third-party service
                providers who help us operate the platform, process payments,
                data analysis, marketing, and manage communications along with
                other relevant services.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="3" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Legal Compliance & Requirements:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                We may disclose your information when required by law, or in
                response to a subpoena, court order, government regulations or
                other legal process.
                <br />
                <br />
              </span>
            </li>
          </ol>
        </div>

        <ul>
          <li className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  ">
            <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-medium">
              D.{" "}
            </span>
            <span
              className=" text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] font-bold underline  underline-offset-4"
              style={{ paddingBottom: "8px" }}
            >
              {" "}
              Your Choices:
              <br />
              <br />
            </span>
          </li>
        </ul>

        <span
          className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
          style={{ fontFamily: "satoshi" }}
        >
          We may share your information with:
          <br />
          <br />
        </span>

        <div
          className="pl-0"
          style={{ whiteSpace: "pre-line", fontFamily: "satoshi" }}
        >
          <ol start="1" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Account Settings:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                You can access and update your account information and
                communication preferences by logging into your account settings.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="2" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Communication Preferences:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                You can manage your communication preferences by adjusting
                settings in your account.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="3" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Cookies and Tracking:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                You can usually control cookies and tracking tools through your
                browser settings.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="4" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Opting Out:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                You can opt out of receiving promotional emails by following the
                instructions provided in the email. However, we may still send
                you transactional and administrative messages related to your
                account.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="5" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Security:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                We employ appropriate technical and organizational measures to
                protect your information from unauthorized access, loss, misuse,
                or alteration. However, no data transmission over the internet
                or electronic storage is entirely secure.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="6" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Changes to This Privacy Policy:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                {" "}
                We may update this Privacy Policy from time to time. The updated
                policy will be posted on our platform, and the date of the
                latest revision will be indicated.
                <br />
                <br />
              </span>
            </li>
          </ol>

          <ol start="7" className="list-decimal">
            <li className="display:list-item text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem] ml-8  font-bold">
              <span className="text-start text-[2rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]">
                Contact Us:{" "}
              </span>
              <span
                className=" text-[1.75rem] max-desktop:text-[1.5rem] max-tablet:text-[1.12rem]  tracking-wide gap-16 pt-1 font-normal"
                style={{ fontFamily: "satoshi" }}
              >
                {" "}
                If you have any questions, concerns, or requests regarding this
                Privacy Policy, please contact us at info@fairseed.org
                <br />
                <br />
              </span>
            </li>
          </ol>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
