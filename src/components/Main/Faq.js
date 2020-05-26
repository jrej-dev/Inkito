import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";

import DownArrow from '../Icons/down-arrow.png';
import UpArrow from '../Icons/up-arrow.png';
import FAQImage from '../Images/2359772.jpg';

import Nav from '../../components/Main/Nav';
import Hero from '../../components/Main/Hero';
import '../../sass/components/Admin.scss';

const Faq = () => {
    const [question, setQuestion] = useState("");

    const basicQuestions = [
        {
            q: "What is Inkito's mission?",
            a: [
                "Giving a chance for creators, trendy or newcomers, to be read and supported via the Hive blockchain.",
                "Making reading and organizing episodic Hive content easy on the platform."
            ]
        },
        {
            q: "What is Hive?",
            a: [
                "Hive is a blockchain created in 2020. It was forked from the Steem blockchain.",
                "It's benefit compared to other blockchains is that it allows 3 second transactions which are free.",
                "Using the capabilities of this new technology, decentralized applications have been developped in order to post content and collect rewards."
            ]
        },
        {
            q: "What is a blockchain?",
            a: [
                "A blockchain is a distributed database, with a cryptographic security, existing on multiple computers at the same time.",
                "Content posted on it is resistant to censorship.",
                "It has no central controlling power.",
                "Websites like Inkito are only displaying content posted in the public database."
            ]
        },
        {
            q: "Who controls the Hive Blockchain?",
            a:
                [
                    "No one owns the Hive Blockchain. It is decentralized.",
                    "No company or person can make unilateral decisions what happens with the blockchain or the currency."
                ]
        },
        {
            q: "What is so great about Inkito?",
            a: [
                "Posts can earn crypto currency rewards.",
                "As opposed to other Hive front end websites, Inkito includes features specifically tailored to story tellers such as series format or infinite canvas.",
                "Posts will exist on many sites (separate interfaces to Hive) which would allow for a wider audience.",
                "Content on the Hive blockchain is censorship resistant."
            ]
        }

    ];

    const securityQuestions = [
        {
            q: "About your passwords?",
            a: [
                "Most importantly: Don’t lose them! There is no password retrieval!",
                "Blockchain passwords are also known as keys. You actually have several keys.",
                "The Master key can reset every other, Active key can transfer your rewards, Posting key allows you to post and give likes to other posts",
                "We recommend the use of the Posting key on Inkito whenever possible. You can find all your keys in the wallet page, keys and permission tab"
            ]
        },
        {
            q: "I have lost my password?",
            a: [
                "The Hive blockchain uses cryptographic keys as login password. While much more secure than a password, we can’t do anything to retrieve your keys if lost."
            ]
        },
        {
            q: "How can I keep my account secure?",
            a: [
                "Save your master password and keep it somewhere safe.",
                "Only log into your account using the key with the appropriate permissions for what you are doing",
                "Once again, we recommend the use of the Posting key on Inkito whenever possible. You can find all your keys in the wallet page, keys and permission tab",
                "It is not recommended to share your password or keys with any third party site."
            ]
        },
        {
            q: "What is HiveSigner?",
            a: [
                "This is a third party authority system used on Inkito for login and transactions.",
                "This adds an extra layer of security as you are not revealing your key/password to the website you are using (in this case, us, Inkito).",
                "It makes it easy and secure to use decentralized applications on the Hive network."
            ]
        }
    ];

    const economicsQuestions = [
        {
            q: "Where does the money come from?",
            a: [
                "The Hive network continually creates new digital tokens to reward content creators and curators.",
                "Some of the newly-created tokens (90%) are transferred to users who add value to Hive (for example through Inkito) by posting, commenting, and liking other people's content.",
                "The remainder (10%) is distributed to holders of Hive Power and the witnesses that power the blockchain.",
            ]
        },
        {
            q: "Does it cost anything to post, comment, or vote?",
            a: [
                "No. It is free to post, comment, and vote on content.",
                "Inkito does take a 10% beneficiary reward on your content and comments but that's only if you get paid anything."
            ]
        },
        {
            q: "Why are creators getting different rewards?",
            a: [
                "While it is possible to post content that goes viral quickly and earn a lot of rewards on a single post, this is not typical for most users.",
                "Just like any other platform, consistency and quality content is key in your overall growth.",
            ]
        },
        {
            q: "When and where will I receive my reward?",
            a: [
                "At the end of 7 days after a post you will receive the actual reward.",
                "You will need to “Claim Rewards” in your wallet",
                "HIVE uses 2 cryptographic currencies: HIVE and HBD",
                "Because you can exchange for currencies like the US dollar they have a USD value. That value fluctuates",
                "These tokens can be bought and sold on 3rd party websites called exchanges. (binance, bittrex, blocktrades etc)"
            ]
        }
    ];

    const futureQuestions = [
        {
            q: "What is planned next?",
            a: [
                "Glad you ask. Inkito is still in beta and we know there are a lot of things left to do.",
                "Our goal is to improve publishing tools, content visibility and reading experience.",
                "We have plans for promoted content on the main page which is not available but visible at the top already.",
                "And much more to come... You can follow us on our blog for the most recent updates."
            ]
        },
        {
            q: "How can I help Inkito grow?",
            a: [
                "So thoughtful of you! Just by posting and commenting, you are supporting the development of Inkito already.",
                "We'd like to make this platform, 'our' platform. A place built by creators, for creators. If you have ideas or suggestions, feel free to send them to us on our blog or by email to hello@inkito.io."
            ]
        },
    ];

    return (
        <>
            <Helmet>
                <html lang="en" />
                <title>Inkito | Frequently Asked Questions</title>
            </Helmet>
            <div>
                <Nav />
                <Hero />
                <div className="faq align-left">
                    <div className="flex col">
                        <img className="faq-img" src={FAQImage} alt="Questions" />
                        <h1>FAQ</h1>
                    </div>

                    <h3>Fundamentals</h3>
                    {
                        basicQuestions.map((object, index) => {
                            return (
                                <wired-card key={object.q} onClick={question === object.q ? () => { setQuestion("") } : () => { setQuestion(object.q) }}>
                                    <div key={object.q} className="flex-between reset">
                                        <p>{object.q}</p>

                                        {
                                            question === object.q ?
                                                <img className="icon toggle" src={UpArrow} alt="up-arrow" onClick={() => { setQuestion("") }} />
                                                :
                                                <img className="icon toggle" src={DownArrow} alt="down-arrow" onClick={() => { setQuestion(object.q) }} />
                                        }
                                    </div>
                                    {
                                        question === object.q ?
                                            <ul>
                                                {object.a.map(answer => {
                                                    return (
                                                        <li key={answer}>
                                                            {answer}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            :
                                            ""
                                    }
                                </wired-card>
                            )
                        })
                    }

                    <h3>Security</h3>

                    {
                        securityQuestions.map((object, index) => {
                            return (
                                <wired-card key={object.q} onClick={question === object.q ? () => { setQuestion("") } : () => { setQuestion(object.q) }}>
                                    <div key={object.q} className="flex-between reset">
                                        <p>{object.q}</p>

                                        {
                                            question === object.q ?
                                                <img className="icon toggle" src={UpArrow} alt="up-arrow" onClick={() => { setQuestion("") }} />
                                                :
                                                <img className="icon toggle" src={DownArrow} alt="down-arrow" onClick={() => { setQuestion(object.q) }} />
                                        }
                                    </div>
                                    {
                                        question === object.q ?
                                            <ul>
                                                {object.a.map(answer => {
                                                    return (
                                                        <li key={answer}>
                                                            {answer}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            :
                                            ""
                                    }
                                </wired-card>
                            )
                        })
                    }

                    <h3>Economics</h3>

                    {
                        economicsQuestions.map((object, index) => {
                            return (
                                <wired-card key={object.q} onClick={question === object.q ? () => { setQuestion("") } : () => { setQuestion(object.q) }}>
                                    <div key={object.q} className="flex-between reset">
                                        <p>{object.q}</p>

                                        {
                                            question === object.q ?
                                                <img className="icon toggle" src={UpArrow} alt="up-arrow" onClick={() => { setQuestion("") }} />
                                                :
                                                <img className="icon toggle" src={DownArrow} alt="down-arrow" onClick={() => { setQuestion(object.q) }} />
                                        }
                                    </div>
                                    {
                                        question === object.q ?
                                            <ul>
                                                {object.a.map(answer => {
                                                    return (
                                                        <li key={answer}>
                                                            {answer}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            :
                                            ""
                                    }
                                </wired-card>
                            )
                        })
                    }

                    <h3>Future of Inkito</h3>

                    {
                        futureQuestions.map((object, index) => {
                            return (
                                <wired-card key={object.q} onClick={question === object.q ? () => { setQuestion("") } : () => { setQuestion(object.q) }}>
                                    <div className="flex-between reset">
                                        <p>{object.q}</p>

                                        {
                                            question === object.q ?
                                                <img className="icon toggle" src={UpArrow} alt="up-arrow" onClick={() => { setQuestion("") }} />
                                                :
                                                <img className="icon toggle" src={DownArrow} alt="down-arrow" onClick={() => { setQuestion(object.q) }} />
                                        }
                                    </div>
                                    {
                                        question === object.q ?
                                            <ul>
                                                {object.a.map(answer => {
                                                    return (
                                                        <li key={answer}>
                                                            {answer}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            :
                                            ""
                                    }
                                </wired-card>
                            )
                        })
                    }

                    <p>For more information about Inkito development you can visit our <a
                        href="https://hive.blog/@inkito"
                        target="_blank"
                        className="blue"
                        rel="noopener noreferrer">
                        blog
                    </a>
                    </p>
                </div>
            </div>
        </>
    );
}


export default Faq;
