import React, { useEffect } from 'react';
import { Helmet } from "react-helmet-async";

import Nav from '../../components/Main/Nav';
import Hero from '../../components/Main/Hero';
import '../../sass/components/Admin.scss';

const Privacy = () => {

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    })

    return (
        <>
            <Helmet>
                <html lang="en" />
                <title>Inkito | Privacy Policy</title>
            </Helmet>
            <div>
                <Nav />
                <Hero />
                <div className="terms w-90 align-left">

                    <div className="group">
                        <h2>Privacy Policy</h2>
                        <p>Last Updated: 23rd of May 2020</p>
                    </div>

                    <wired-card>
                        <h3>Summary</h3>
                        <p>This is a non legal summary of what comes next in the full privacy policy. Reading this summary does not replace reading or agreeing to the full policy.</p>
                        <ol>
                            <li>
                                <h4>
                                    Please read below some of the different ways Inkito uses your data.
                            </h4>
                                <ul>
                                    <li>
                                        <p>
                                            Publishing non-reversable data into the Hive Blockchain.
                                    </p>
                                    </li>
                                    <li>
                                        <p>
                                            The use of analytics tools.
                                    </p>
                                    </li>
                                    <li>
                                        <p>
                                            Using cookies to improve the user experience (user session and bookmarks).
                                    </p>
                                    </li>
                                    <li>
                                        <p>
                                            We use date/time of your device to calculate posting dates and set content ids.
                                    </p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h4>
                                    About the Hive Blockchain
                            </h4>
                                <p>
                                    As mentioned above, we store little to no data on Inkito (user session and bookmarks).
                                    Data which is sent to the Hive blockchain is no longer stored but only accessed frequently.
                            </p>
                                <p>
                                    Data sent to the blockchain cannot be deleted by Inkito or anyone else. For that reason, it is to be considered Public Data. (Comments, votes, posts, etc.)
                            </p>
                            </li>
                        </ol>

                    </wired-card>


                    <h3>PRIVACY POLICY</h3>
                    <p>
                        This Privacy Policy describes how Inkito collectively referred to as "inkito.io"
                        (Inkito, “service”, “services”, “we”, “us” or “our”) collects, uses, and handles your
                        data when you use our website, products and services ("Services"). Please take the time to
                        carefully read through this policy. As you use our Services, we want to be clear how inkito.io
                        uses your information and how your privacy is protected. By using the Services, you consent to
                        the data practices detailed in this policy.
                </p>
                    <h3>Information Provided By You</h3>
                    <p>
                        We collect information you send directly to us when you are using the Services.
                        The information we collect can be some of the following:
                </p>
                    <ul>
                        <li>
                            <h4>User Information and Content</h4>
                            <p>
                                Content and other information you provide when you use our Services.
                                This includes information used to create your account (such as a username, an email address, phone number),
                                account preferences, and the content of information you post to the Services (such as text, photos, videos, links).
                        </p>
                        </li>
                        <li>
                            <h4>Other Cases</h4>
                            <p>
                                You may choose to provide other information directly to us.
                                For example, we may collect information for participating in a contest,
                                sweepstakes or promotions, apply for a job,
                                communicate with us via third-party sites and services,
                                request customer support or otherwise communicate with us.
                        </p>
                        </li>
                    </ul>

                    <h3>Information Collected by Us</h3>
                    <p>
                        When you access or use our Services,
                        we may also collect information about you.
                        They are listed below:
                </p>
                    <ul>
                        <li>
                            <h4>Usage Data</h4>
                            <p>
                                We may log information when you access and use the Services.
                                This may include your IP address, user-agent string, browser type, operating system,
                                referral URLs, device information (e.g., device IDs), pages visited, links clicked,
                                user interactions (e.g., voting data), the requested URL, hardware settings,
                                and search terms.
                        </p>
                        </li>
                        <li>
                            <h4>Cookies</h4>
                            <p>
                                We may collect information from cookies in order to improve your user experience.
                                In the current version of the site information collected through cookies include user session and bookmarks.
                                A cookie consent banner appears when you first connect. You can choose to opt out of this feature if you wish to.
                                More information about cookies read our cookie policy section.
                        </p>
                        </li>
                        <li>
                            <h4>Social Media Sharing</h4>
                            <p>
                                We offer social sharing features or other integrated tools that let you share content
                                or actions you take on our Services with other media. Your use of these features enables the
                                sharing of certain information with your friends or the public, depending on the settings you
                                establish with the third party that provides the social sharing feature. For more information
                                about the purpose and scope of data collection and processing in connection with social
                                sharing features, please visit the privacy policies of the third parties that provide these
                                social sharing features (such as, Tumblr, Facebook, Reddit, Pinterest, and Twitter).
                        </p>
                        </li>
                    </ul>

                    <h3>Use of Personal Information</h3>
                    <p>To provide our service we will use your personal information in the following ways:</p>

                    <ul>
                        <li>
                            <p>
                                To enable you to access and use the Services.
                        </p>
                        </li>
                        <li>
                            <p>
                                To maintain and improve the Service.
                        </p>
                        </li>
                        <li>
                            <p>
                                To comply with law.
                        </p>
                        </li>
                        <li>
                            <p>
                                For compliance, fraud prevention, and safety.
                        </p>
                        </li>
                    </ul>
                    <h3>Sharing of Personal Information</h3>
                    <p>
                        We do not share or sell the personal information that you provide us with other organizations
                        without your express consent, except as described in this Privacy Policy.

                        Please note that certain information may be shared with third parties under the following circumstances:
                </p>
                    <ul>
                        <li>
                            <h4>
                                Affiliates.
                        </h4>
                            <p>
                                We may disclose your personal information to our subsidiaries and
                                corporate affiliates for purposes consistent with this Privacy Policy.
                        </p>
                        </li>
                        <li>
                            <h4>
                                Business Transfers.
                        </h4>
                            <p>
                                We may share personal information when we do a business deal,
                                or negotiate a business deal, involving the sale or transfer of all or a part of
                                our business or assets. These deals can include any merger, financing, acquisition,
                                or bankruptcy transaction or proceeding.
                        </p>
                        </li>
                        <li>
                            <h4>Compliance with Laws. </h4>
                            <p>
                                We may share information to comply with laws,
                                to respond to lawful requests and legal processes.
                        </p>
                        </li>
                        <li>
                            <h4>Professional Advisors and Service Providers. </h4>
                            <p>
                                We may share information with those who need it to do work for us.
                                These recipients may include third party companies and individuals to
                                administer and provide the Service on our behalf (such as customer support,
                                hosting, email delivery and database management services), as well as lawyers,
                                bankers, auditors, and insurers.
                        </p>
                        </li>
                        <li>
                            <h4>Others</h4>
                            <p>
                                We may share information with your consent or at your direction.
                        </p>
                            <p>
                                We may share aggregated or anonymized information, which cannot reasonably be used to identify you.
                        </p>
                        </li>
                    </ul>

                    <h3>International Data Transfers</h3>
                    <p>
                        By accessing or using the Services or otherwise providing information to
                        us, you consent to the processing, transfer and storage of information
                        in and to applicable countries, where you may not have the same rights
                        as you do under local law.
                </p>

                    <h3>Analytics</h3>
                    <p>
                        We may use an analytics partner (such as Xiti) to help analyze usage and traffic
                        for our Services. We may use analytics partners to analyze and measure,
                        in the aggregate, the number of unique visitors to our Services.
                </p>
                    <p>
                        For more information about how you may control the collection and use of information for
                        analytics purposes, please see "Your Options."
                </p>

                    <h3>Your Security</h3>
                    <p>
                        We take reasonable measures to protect your information
                        from loss, theft, misuse and unauthorized access, disclosure,
                        alteration, and destruction.
                </p>

                    <h3>Individuals under 18</h3>
                    <p>
                        As we cannot guarantee that you will not encounter adult-oriented topics,
                        access and use of Inkito is restricted to individuals over 18 years old.
                        Consequently, individuals under the age of 18 may not create an account or otherwise access or use the Services.
                </p>

                    <h3>Your Options</h3>
                    <ul>
                        <li>
                            <h4>Delete Account</h4>
                            <p>
                                Inkito does not receive or store your Account password, private keys and addresses.
                                The account is stored in the Hive Blockchain and cannot be deleted by Inkito.
                        </p>
                        </li>
                        <li>
                            <h4>Cookies</h4>
                            <p>
                                When you first visit Inkito, a cookie consent banner appears which allows you to opt out on the use of cookies. You can also disable the use of third-party cookies through your web browser.
                                Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Services.
                        </p>
                        </li>
                        <li>
                            <h4>Third-Party Analytics</h4>
                            <p>
                                Our analytics provider Xiti provides a specific opt-out mechanisms
                            (<a href="https://www.xiti.com/en/optout.aspx" className="blue" target="_blank" rel="noopener noreferrer">Xiti Opt-out</a>).
                        </p>
                        </li>
                    </ul>

                    <h3>Changes</h3>
                    <p>
                        We reserve the right to change this Privacy Policy from time to time.
                        If we do, we will let you know by revising the date at the top of the policy.
                        If we make a change to this policy that, in our sole discretion, is material,
                        we will provide you with additional notice. We encourage you to review the Privacy Policy
                        whenever you access or use our Services or otherwise interact with us to stay informed
                        about our information practices and the ways you can help protect your privacy.
                        If you continue to use our Services after Privacy Policy changes go into effect,
                        you consent to the revised policy.
                </p>
                    <h3>Contact Us</h3>
                    <p>Feel free to contact us on <a href="mailto:privacy@inkito.io" className="blue">privacy@inkito.io</a> if you have any concerns or questions about your privacy.</p>
                </div>
            </div>
        </>
    );
}


export default Privacy;
