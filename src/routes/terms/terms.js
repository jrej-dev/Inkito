import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Hero from '../../components/hero/hero';

const Terms = () => {

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  })

  return (
    <>
    <Helmet>
      <html lang="en" />
      <title>Inkito | Terms Of Services</title>
    </Helmet>
    <div>
      <Hero />
      <div className="terms w-90 align-left">

        <div className="group">
          <h2>Terms of service</h2>
          <p>Last Updated: 22nd of May 2020</p>
        </div>

        <div className="group">
          <h3>We are Inkito.</h3>
          <p>Inkito is a specialized frontend for the Hive blockchain.</p>
        </div>

        <wired-card >
          <h3>Summary</h3>
          <p>This is a non legal summary of what comes next in the full terms of services. Reading this summary does not replace reading or agreeing to the full legal terms of service.</p>
          <ul>
            <li>
              Inkito sends transactions to the Hive Blockchain but we store almost no information on our own services.
              </li>
            <li>
              We cannot modify or delete content on the Hive Blockchain.
              </li>
            <li>
              We can modify access to the content only on Inkito (we cannot impact other third parties).
              </li>
            <li>
              We do store some data such as, but not limited to, page bookmarks or user settings.
              </li>
            <li>
              We do not store private keys (user's password) and we cannot help you remember or recover them.
                </li>
            <li>
              Inkito is not intended for users under 18 (as we cannot guarantee prevention of access to adult content).
              </li>
            <li>
              A non exhaustive list of the risks you could encounter operating on Inkito are outlined below:
                  <ul>
                <li>
                  Loosing your private keys and consequently your access to HIVE/HP/HBP which we are not responsible of.
                    </li>
                <li>
                  Seeing adult themed material.
                    </li>
                <li>
                  Posting content mistakenly. (As you cannot delete content on the Hive blockchain)
                    </li>
                <li>
                  Malicious or damaging third party internet links.
                    </li>
                <li>
                  Server failure or temporary loss of access to Inkito.
                    </li>
                <li>
                  A Transaction not being sent to the Hive blockchain (in the event of a technical failure by Inkito or a third party such as the Hive blockchain itself).
                    </li>
                <li>
                  Coming in contact to unsavory third parties or third party content.
                    </li>
              </ul>
            </li>
            <li>
              Inkito content, logos, tradmarks, code are NOT a free for all, you must have written permission to use or change.
              </li>
            <li>
              Inkito does not move money around we only facilitate transactions inside the Hive blockchain with your permission.
              </li>
            <li>
              A non exaustive list of actions we do not tolerate:
                <ul>
                <li>
                  Fraud.
                  </li>
                <li>
                  Terrorist activities.
                  </li>
                <li>
                  Theft (or copyright infringement).
                  </li>
                <li>
                  Hurt on Inkito (with, for example, malicious software or system overburdening).
                  </li>
                <li>
                  Distortion, curruption or misuse our code.
                  </li>
                <li>
                  Use of Inkito to extract data
                  </li>
                <li>
                  Access to restricted areas of the site.
                  </li>
              </ul>
            </li>
            <li>
              Access to all stolen content will be removed from Inkito once properly notified. (Please note that we cannot remove content or modify transactions on the Hive blockchain)
              </li>
          </ul>
        </wired-card>

        <h3>LEGAL TERMS OF SERVICE</h3>
        <p>
          Inkito (“Inkito”, “service”, “services”, “we”, “us” or “our”) is a platform that interacts with the
          <a href="https://hive.io/" className="blue pointer" target="_blank" rel="noopener noreferrer" title="Hive blockchain documentation"> Hive blockchain</a>.
          Interactions are possible via the blockchain protocol. Please refer to the Hive documentation for more information about how it works.
          The following are the terms of service (“Terms”) for using Inkito. It is not a generic document to define the Terms of Service of the Hive blockchain.
          We may change these terms at any time. If we decide to make changes to this Agreement, we will provide notice of those changes by updating the “Last Updated” date above or posting notice on this site.
          Your continued use of the Service will confirm your acceptance of the changes.
        </p>
        <h3>Privacy Policy</h3>
        <p>
          Please refer to our <Link to="/privacy" className="blue">Privacy Policy</Link> for information about how we collect, use, and disclose information about you.
        </p>
        <h3>Eligibility</h3>
        <p>
          The Service is not targeted toward, nor intended for use by, anyone under the age of 18.
          You must be at least 18 years of age to access or use of the Service.
          </p>
        <h3>Copyright and License</h3>
        <p>
          You retain ownership of and responsibility for Content you create or own ("Your Content").
          If you're posting anything you did not create yourself or do not own the rights to, you agree that:
        </p>
        <ul>
          <li>
            <p>
              You are responsible for any Content you post.
              </p>
          </li>
          <li>
            <p>
              You will only submit Content that you have the right to post.
            </p>
          </li>
          <li>
            <p>
              You will fully comply with any third-party licenses relating to Content you post.
            </p>
          </li>
        </ul>
        <p>We may retain our own data, text, images, graphics, software, code, scripts and other content supplied by us,
        the Hive blockchain or our licensors, which we call "Inkito Content." Inkito Content is protected by intellectual property laws,
        including copyright and other proprietary rights of applicable countries.

        You are granted a limited, nonexclusive, non-transferable, and non-sublicensable license to access and use Inkito and Inkito Content for your personal,
        non-commercial use. This license is subject to these Terms and does not include any right to:
        </p>
        <ul>
          <li>
            <p>
              Distribute or publicly display any Inkito Content without our written consent.
            </p>
          </li>
          <li>
            <p>
              Use any data mining, robots or similar extraction methods.
            </p>
          </li>
          <li>
            <p>
              Use Inkito or Inkito Content other than for their intended purposes.
            </p>
          </li>
        </ul>
        <p>
          Any use of Inkito or Inkito Content other than as authorized in these Terms is strictly prohibited and will terminate the license granted herein.
          </p>
        <h3>Trademarks</h3>
        <p>
          All trademarks, registered trademarks, product names and company names or logos mentioned or used on our Service are the property of their respective owners
          and may not be copied, imitated, or used, in whole or in part, without the permission of the applicable trademark holder. Reference to any products, services,
          processes or other information by name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship, or recommendation by us.
          </p>
        <h3>Adult-Oriented Content</h3>
        <p>
          Inkito is intended for a general audience and, as a result, some content found on Inkito may discuss or depict adult-oriented topics.
          We understand that this content may not be appropriate or desirable for some of our readers depending on their current location, age, background or personal views.
        </p>
        <p>
          The current alpha version of the site has not implemented a feature that allows content to be flagged as NSFW, consequently you acknowledge that it is possible
          that you may encounter adult-oriented topics.  You understand and agree that you access content on Inkito at your own risk.
        </p>
        <h3>Assumption of Risk, Limitations on Liability.</h3>
        <ol>
          <li>
            <p>
              You accept and acknowledge that there are risks associated with utilizing an Internet-based Hive account service including, but not limited to, the risk of failure of hardware, software and Internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to information stored within your Account, including, but not limited to your Private Key (see below).
              You accept and acknowledge that Inkito will not be responsible for any communication failures, disruptions, erro  rs, distortions or delays you may experience when using the Services, however caused.
              To avoid some of these risks we recommend to:
            </p>
            <ul>
              <li>
                <p>
                  Click on any links with caution, in particular any links that redirect to locations outside of our website.
                </p>
              </li>
              <li>
                <p>
                  Be extremely careful with storing your private keys (user's password) and be careful which third party services you give access to private keys.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>
              We will use reasonable endeavours to verify the accuracy of any information on the Service but we make no representation or warranty of any kind, express or implied,
              statutory or otherwise, regarding the contents of the Service, information and functions made accessible through the Service, any hyperlinks to third party websites,
              nor for any breach of security associated with the transmission of information through the Service or any website linked to by the Service.
            </p>
          </li>
          <li>
            <p>
              We will not be responsible or liable to you for any loss and take no responsibility for
              and will not be liable to you for any use of our Services, including but not limited to any losses,
              damages or claims arising from:
            </p>
            <ol type='a'>
              <li>
                <p>
                  User error such as forgotten passwords, incorrectly constructed transactions,
                  or mistyped Hive addresses.
                </p>
              </li>
              <li>
                <p>
                  Server failure or data loss.
                </p>
              </li>
              <li>
                <p>
                  Corrupted Account files.
                </p>
              </li>
              <li>
                <p>
                  Unauthorized access to applications.
                </p>
              </li>
              <li>
                <p>
                  Any unauthorized third party activities, including without limitation the use of viruses,
                  phishing, bruteforcing or other means of attack against the Service or Services.
                </p>
              </li>
            </ol>
          </li>
          <li>
            <p>
              We make no warranty that the Service or the server that makes it available,
              are free of viruses or errors, that its content is accurate, that it will be uninterrupted,
              or that defects will be corrected. We will not be responsible or liable to you for any loss of any kind,
              from action taken, or taken in reliance on material, or information, contained on the Service.
            </p>
          </li>
          <li>
            <p>
              Subject to what is stated in paragraph 'Limitation of Liability' included below, any and all indemnities,
              warranties, terms and conditions (whether express or implied) are hereby excluded to the fullest extent
              permitted under applicable law.
            </p>
          </li>
          <li>
            <p>
              We will not be liable, in contract, or tort (including, without limitation, negligence),
              other than where we have been fraudulent or made negligent misrepresentations.
            </p>
          </li>
          <li>
            <p>
              Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraudulent misrepresentation,
              or any other liability which may not otherwise be limited or excluded under applicable law.
            </p>
          </li>
        </ol>
        <h3>Indemnity</h3>
        <p>
          All the things you do and all the content you submit or post to the Service
          remain your responsibility. You agree that you will not hold us
          legally liable for any of your content or actions that infringe the law or the rights of a third
          party or person in any way.
        </p>
        <p>
          More precisely, you agree to hold us, our affiliates, officers, directors, employees, agents,
          and third-party service providers harmless from and defend them against any claims, costs, damages,
          losses, expenses, and any other liabilities, including attorneys’ fees and costs, arising out of or
          related to your access to or use of the Service, your violation of this user agreement, and/or your
          violation of the rights of any third-party or person.
        </p>
        <h3>No Liability For Third Party Services And Content</h3>
        <p>
          In using our Services, you may view content or utilize services provided by third parties,
          including links to web pages and services of such parties ("Third Party Content").
          We do not control, endorse or adopt any Third-Party Content and will have no responsibility
          for Third Party Content including, without limitation, material that may be misleading, incomplete,
          erroneous, offensive, indecent or otherwise objectionable in your jurisdiction. In addition,
          your dealings or correspondence with such third parties are solely between you and the third parties.
          We are not responsible or liable for any loss or damage of any sort incurred as a result of any such
          dealings and you understand that your use of Third Party Content, and your interactions with third
          parties, is at your own risk.
        </p>
        <h3>Registration</h3>
        <p>
          Content displayed on Inkito is visible without an account. However any interaction with the website (likes, comments, follow, etc) require a Hive account. We are not able to create new Hive accounts on Inkito but provide links to external systems that allow you to do so.
          Please refer to the specific Terms of these external services when creating an account through them.
        </p>
        <h3>The Services</h3>
        <ol>
          <li>
            <p>
              As described in more detail below, the Services, among other things,
              provide software that facilitates the submission of Hive blockchain transaction data to
              the Hive blockchain without requiring you to access the Hive blockchain command line interface.
            </p>
          </li>
          <li>
            <p>
              Account and Private Keys. When an Account is created for our Service,
              a cryptographic private and public key pair are generated and are provided solely to you and
              completely owned by you. We never have access to your Private Key and do not custody any Private Keys on your behalf,
              and therefore, assume no responsibility for the management of the Private Key tied to your Account.
              The Private Key uniquely match the Account name and must be used in connection with the Account to
              authorize the transfer of HIVE and Hive Dollars from that Account. You are solely responsible for
              maintaining the security of your Private Keys. You must keep your Private Key access information
              secure. Failure to do so may result in the loss of control of HIVE, Hive Power and Hive Dollars
              associated with your Account.
            </p>
          </li>
          <li>
            <p>
              No Password Retrieval. We do not receive or store your Account password or Private Keys. Therefore,
              we cannot assist you with Account password retrieval.
            </p>
            <p>
              Inkito does not have account creation services however we do connect to third party systems that do.
              It is typical practice of third party new account creation services to provide you with tools to help you
              remember or recover your password, including by allowing you to set password hints,
              but even these Services cannot generate a new password for your Account.
              You are solely responsible for remembering your Account password.
              If you have not safely stored a backup of any Account Names and password pairs maintained in your Account,
              you accept and acknowledge that any Hive, Hive Dollars and Hive Power you have associated with such
              Account will become inaccessible if you do not have your Account password.
            </p>
          </li>
          <li>
            <p>
              Transactions. All proposed Hive blockchain transactions must be confirmed and recorded in the Hive blockchain via the Hive
              distributed consensus network (a peer-to-peer network that
              uses a cryptographic protocol), which is not owned, controlled or operated by Inkito. The Hive Network
              is operated by a decentralized network of independent third parties. Inkito has no control over the Hive network
              and therefore cannot and does not ensure that any transaction details you submit via the Services will be
              confirmed via the Hive network. You acknowledge and agree that the transaction details you submit via the
              Services may not be completed, or may be substantially delayed, by the Hive network.
              You may use the Services to submit these details to the network.
            </p>
          </li>
          <li>
            <p>
              No Storage or Transmission of HIVE, Hive Dollars or Hive Power. HIVE, in any of its forms
              (HIVE, Hive Dollars and Hive Power) is an intangible, digital asset controlled by you.
              These assets exist only by virtue of the ownership record maintained on the Hive blockchain.
              The Service does not store, send, or receive HIVE, Hive Dollars, or Hive Power. Any transfer of title
              that might occur in any HIVE, Hive Dollars or Hive Power occurs on the Hive blockchain and not within
              the Services. We do not guarantee that the Service can affect the transfer of title or right in any HIVE,
              Hive Dollars or Hive Power.
            </p>
          </li>
          <li>
            <p>
              Relationship. Nothing in these Terms is intended to nor shall create any partnership,
              joint venture, agency, consultancy or trusteeship, you and Inkito being with respect to
              one another are independent contractors.
            </p>
          </li>
          <li>
            <p>
              Accuracy of Information. You represent and warrant that any information you provide via these Services
              is accurate and complete. You accept and acknowledge that Inkito is not responsible for any errors or
              omissions that you make in connection with any Hive transaction initiated via the Services, for instance,
              if you mistype an Account Name or provide incorrect information.
            </p>

            <p>
              Please review your transaction details carefully before completing them via these Services.
            </p>
          </li>
          <li>
            <p>
              No Cancellations or Modifications. Once transaction details have been submitted to the Hive blockchain
              via the Services, The Services cannot assist you to cancel or otherwise modify your transaction details.
              We have no control over the Hive blockchain and do not have the ability to facilitate any cancellation or
              modification requests.
            </p>
            <p>
              While a transaction submitted to the Hive network can not be modified or canceled,
              you can send a new transaction to overwrite the presented information on interfaces to the Hive Blockchain.
              We recommend to do so when you need assistance correcting your mistakes, votes or delegation, etc.
            </p>
          </li>
          <li>
            <p>
              Taxes. It is your responsibility to determine what, if any, taxes apply to the transactions you for
              which you have submitted transaction details via the Services, and it is your responsibility to report
              and remit the correct tax to the appropriate tax authority. You agree that the Inkito is not responsible
              for determining whether taxes apply to your Hive blockchain transactions or for collecting, reporting,
              withholding, or remitting any taxes arising from any Hive blockchain transactions.
            </p>
          </li>
        </ol>
        <h3>Fees for Using the Services</h3>
        <p>
          Inkito takes a 10% beneficiary rewards on all posts and comments transactions. These rewards go to the @inkito
          account and are used to fund the development of the platform. We reserve the right to modify this rate in the future.
          We will provide notice of those changes by updating these terms or posting notice on this site.
        </p>
        <h3>No Right To Cancel And/Or Reverse Hive Transactions</h3>
        <p>
          If you use a Service to which HIVE, Hive Dollars or Hive Power is transacted, you will not be able to change
          your mind once you have confirmed that you wish to proceed with the Service or transaction.
          </p>
        <h3>Discontinuation of Services.</h3>
        <p>
          We may, in our sole discretion and without cost to you, with or without prior notice and at any time,
          modify or discontinue, temporarily or permanently, any portion of our Services.
          You are solely responsible for storing, outside of the Services, a backup of any Account and Private Key
          that you maintain in your Account.
        </p>
        <h3>Suspension or Termination of Service.</h3>
        <p>
          We may suspend or terminate your access to these Services in our sole discretion, immediately and without prior notice, and delete or deactivate all related information and files (such as, but not limited to, Inkito user settings) in such without cost to you, including, for instance, in the event that you breach any term of these Terms.
          </p>
        <p>
          Be advised that termination from Inkito has no effect on your ability to access the Hive network with other third party services.
          </p>
        <h3>User Conduct</h3>
        <p>
          When accessing or using these Services, you agree that you will not commit any unlawful act,
          and that you are solely responsible for your conduct while using our Services.
          Without limiting the generality of the foregoing, you agree that you will not:
          </p>
        <ol>
          <li>
            <p>
              Use our Services in any manner that could interfere with, disrupt, negatively affect or inhibit other users from fully enjoying our Services, or that could damage,
              disable, overburden or impair the functioning of our Services or the Hive network in any manner.
              </p>
          </li>
          <li>
            <p>
              Use our Services to pay for, support or otherwise engage in any activities prohibited by law,
              including, but not limited to illegal gambling, fraud, money laundering, or terrorist activities.
              </p>
          </li>
          <li>
            <p>
              Use any robot, spider, crawler, scraper or other automated means or
              interface not provided by us to access our Services or to extract data.
              </p>
          </li>
          <li>
            <p>
              Use or attempt to use another user’s account without authorization.
              </p>
          </li>
          <li>
            <p>
              Attempt to circumvent any content filtering techniques we employ,
              or attempt to access any service or area of our Services that you are not authorized to access.
              </p>
          </li>
          <li>
            <p>
              Introduce to the Services any virus, Trojan, worms, logic bombs or other harmful material.
              </p>
          </li>
          <li>
            <p>
              Encourage or induce any third party to engage in any of the activities prohibited under this Section.
              </p>
          </li>
          <li>
            <p>
              Reverse engineer any aspect of Inkito or do anything that might discover source code or bypass or circumvent measures employed to prevent or limit access to any Inkito Content, area or code of Inkito.
              </p>
          </li>
        </ol>
        <h3>Copyright Violations, the DMCA, and Takedowns</h3>
        <ol>
          <li>
            <p>
              If you are a copyright owner or an agent thereof and believe that any Content infringes upon
              your copyrights, you may submit a notification pursuant to the Digital Millennium Copyright Act ("DMCA")
              by providing the following information by email to copyright@inkito.io in writing (see 17 U.S.C 512(c)(3) for
              further detail):
                </p>

            <ol type='a'>
              <li>
                <p>
                  A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;
                </p>
              </li>
              <li>
                <p>
                  Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site;
                  </p>
              </li>
              <li>
                <p>
                  Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled and information reasonably sufficient to permit the service provider to locate the material;
                  </p>
              </li>
              <li>
                <p>
                  Information reasonably sufficient to permit the service provider to contact you, such as an address, telephone number, and, if available, an electronic mail;
                  </p>
              </li>
              <li>
                <p>
                  A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and
                  </p>
              </li>
              <li>
                <p>
                  A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                  </p>
              </li>
            </ol>

            <p>
              You acknowledge that if you fail to comply with all of the requirements of this Section your DMCA notice may not be valid.
            </p>
          </li>


          <li>
            <p>
              Counter-Notice. If you believe that your Content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the material in your Content, you may send a counter-notice by either of the methods outlined containing the following information:
              </p>
            <ol type="a">
              <li>
                <p>
                  Your physical or electronic signature;
                </p>
              </li>
              <li>
                <p>
                  Identification of the Content that has been removed or to which access has been disabled and the location at which the Content appeared before it was removed or disabled;
                </p>
              </li>
              <li>
                <p>
                  A statement that you have a good faith belief that the Content was removed or disabled as a result of mistake or a misidentification of the Content; and
                  </p>
              </li>
              <li>
                <p>
                  Your name, address, telephone number, and e-mail address, and a statement that you consent to the jurisdiction of federal district court for the judicial district in which the address is located, or if your address is outside of the United States, for any judicial district in which the service provider may be found,and a statement that you will accept service of process from the person who provided notification of the alleged infringement.
                  </p>
              </li>
            </ol>
            <p>
              Upon receiving a counter-notice we will forward it to the complaining party and tell them we will restore your content within 10 business days. If that party does not notify us that they have filed an action to enjoin your use of that content on the Service before that period passes, we will consider restoring your user content to the site.
                  </p>

          </li>
          <p>
            It is our policy to deny use of the Service to users we identify as repeat infringers. We apply this policy at our discretion and in appropriate circumstances, such as when a user has repeatedly been charged with infringing the copyrights or other intellectual property rights of others.
          </p>
        </ol>
        <h3>Disclaimers</h3>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW,
          Inkito AND THE Inkito CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE"
          BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING,
          WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT AND ANY WARRANTIES IMPLIED BY
          ANY COURSE OF PERFORMANCE OR USAGE OF TRADE. Inkito DOES NOT REPRESENT OR
          WARRANT THAT Inkito AND THE Inkito CONTENT: (A) WILL BE SECURE OR AVAILABLE AT
          ANY PARTICULAR TIME OR LOCATION; (B) ARE ACCURATE, COMPLETE, RELIABLE, CURRENT
          OR ERROR-FREE OR THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED; AND (C) ARE
          FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF Inkito AND THE Inkito
          CONTENT IS SOLELY AT YOUR OWN RISK. SOME JURISDICTIONS DO NOT ALLOW THE
          DISCLAIMER OF IMPLIED TERMS IN CONTRACTS WITH CONSUMERS, SO SOME OR ALL OF
          THE DISCLAIMERS IN THIS SECTION MAY NOT APPLY TO YOU.
        </p>
        <h3>Limitation of Liability</h3>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW,
          IN NO EVENT SHALL Inkito OR THE Inkito PARTIES BE LIABLE FOR ANY SPECIAL,
          INDIRECT, INCIDENTAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES,
          OR ANY OTHER DAMAGES OF ANY KIND, INCLUDING, BUT NOT LIMITED TO,
          LOSS OF USE, LOSS OF PROFITS OR LOSS OF DATA, WHETHER IN AN ACTION
          IN CONTRACT, TORT (INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE) OR
          OTHERWISE, ARISING OUT OF, OR IN ANY WAY CONNECTED WITH, THE USE OF,
          OR INABILITY TO USE, Inkito OR THE Inkito CONTENT. TO THE FULLEST EXTENT
          PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE AGGREGATE LIABILITY
          OF Inkito OR THE Inkito PARTIES, WHETHER IN CONTRACT, WARRANTY, TORT
          (INCLUDING NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED), PRODUCT
          LIABILITY, STRICT LIABILITY OR OTHER THEORY, ARISING OUT OF OR RELATING
          TO: (A) THE USE OF OR INABILITY TO USE Inkito OR THE Inkito CONTENT; OR (B)
          THESE TERMS EXCEED ANY COMPENSATION YOU PAY, IF ANY, TO Inkito FOR ACCESS
          TO OR USE OF Inkito.

          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
          CERTAIN DAMAGES, SO SOME OR ALL OF THE EXCLUSIONS AND LIMITATIONS
          IN THIS SECTION MAY NOT APPLY TO YOU.
        </p>
        <h3>Modifications to the Service</h3>
        <p>
          We reserve the right to modify or discontinue, temporarily or permanently, the Service, or any features or portions of the Service, without prior notice. You agree that we will not be liable for any modification, suspension, or discontinuance of the Service.
          </p>
        <h3>Termination</h3>
        <p>
          We reserve the right, without notice and in our sole discretion, to terminate your license to access and use of the Service, which includes this site, and to block or prevent your future access to, and use of, the Service that we provide.
          </p>
        <h3>Severability</h3>
        <p>
          If any term, clause or provision of these Terms is deemed to be unlawful, void or for any reason unenforceable, then that term, clause or provision shall be deemed severable from these Terms and shall not affect the validity and enforceability of any remaining provisions.
          </p>
        <h3>Changes of the terms</h3>
        <p>
          This Agreement is the entire agreement between you and us
          concerning the Service. It supersedes all prior or contemporaneous
          agreements between you and us. We may modify this user agreement
          at any time. If we make changes to this agreement that materially
          affect your rights, we will provide notice and keep this edition
          available as an archive. By continuing to use the Services after a
          change to this agreement, you agree to those changes.
          </p>
        <h3>Questions & Contact Information</h3>
        <p>You can send questions or comments for Inkito to <a href="mailto:hello@inkito.io" className="blue">hello@inkito.io</a>.</p>
      </div>
    </div>
    </>
  );
}


export default Terms;
