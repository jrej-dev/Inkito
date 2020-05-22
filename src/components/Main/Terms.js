import React from 'react';

import Nav from '../../components/Main/Nav';
import Hero from '../../components/Main/Hero';

const Terms = () => {

  return (
    <div>
      <Nav />
      <Hero />
      <div className="terms w-90 align-left">
        <h2>Welcome to Inkito</h2>
        <p>Inkito is a frontend to the Hive blockchain.</p>
        
        <div>
          <h3>Summary</h3>
          <p>This is a non legal summary of what comes below in this document. This summary does not take the place of reading or agreeing to the full legal terms of service.</p>
          <ul>
            <li>
              Inkito sends transactions to the Hive Blockchain but we store little to no information on our own services.
              </li>
            <li>
              We can not modify or delete content on the Hive Blockchain
              </li>
            <li>
              We can modify access to the content but ONLY on Inkito (we can not impact other third parties)
              </li>
            <li>
              We do store some data such as, but not limited to, user settings
              </li>
            <li>
              We do not store private keys ("passwords") and we can not help you remember or recover them
              </li>
            <li>
              Inkito is not intended for use under 18 (as we can not guarantee prevention of access to adult content)
              </li>
            <li>
              On a related note Inkito has no ability to verify your age nor will it ask for your age.
              </li>
            <li>
              Some, but not all, risks of operating on Inkito outlined are:
                <ul>
                  <li>
                    risk of you loosing your private keys and thus access to HIVE/HP/HBP we are not responsible.
                  </li>
                  <li>
                    risk you may see adult themed material.
                  </li>
                  <li>
                    risk of mistakenly posting content. (Risk that you can not change or modify on the Hive blockchain)
                  </li>
                  <li>
                    risk of third party internet links outside of Hivepak that are malicious or damaging.
                  </li>
                  <li>
                    risk of server failure or temporary loss of access to Inkito.
                  </li>
                  <li>
                    risk of a transaction not being sent to Hive blockchain (Such as through technical failure by Inkito or a third party such as the Hive blockchain itself).
                  </li>
                  <li>
                    risk of coming in contact to unsavory third parties or third party content.
                  </li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


export default Terms;
