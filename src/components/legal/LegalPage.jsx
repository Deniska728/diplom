import React from 'react';

import showdown from 'showdown';

const converter = new showdown.Converter();

const text = `
#User Agreement

This User Agreement (hereinafter referred to as the Agreement) regulates the relations between FE Aleshkovsky N.S. (hereinafter referred to as GraphQQ or Administration) on the one hand and the site user on the other.
The GraphQQ website is not a mass medium.

By using the site, you agree to the terms of this agreement.  
**If you do not agree to the terms of this agreement, do not use the GraphQQ website!**

##Subject matter of the agreement
**The administration grants the user the right to place the following information on the site:**

##Subject matter of the agreement
**The administration grants the user the right to place the following information on the site:**
- Text information

##Rights and obligations of the parties
**The user has the right:**
- web search
- provide information on site
- provide information for the site
- use this site information for personal, non-commercial purposes

**The user undertakes:**
- stay tuned
- not to use scripts (programs) for automated data collection and/or interaction with the Site and its Services

**The Administration undertakes:**
- maintain the site's operability, except in cases when it is impossible for reasons beyond the Administration's control.

##Liability of the parties
- the administration does not bear any responsibility for services provided by third parties
- in the event of a force majeure situation (hostilities, state of emergency, natural disaster, etc.) the Administration does not guarantee the safety of the information posted by the User, as well as uninterrupted operation of the information resource

##Terms and conditions of the Agreement
This Agreement comes into force upon registration on the site.
The Agreement ceases to be in force when a new version of the Agreement is available.
The Administration reserves the right to unilaterally change this Agreement at its sole discretion.
Administration does not notify users about changes in the Agreement.
`;

const LegalPage = () => {
  return (
    <div className="legal-page">
      <div
        className="legal-page-content"
        dangerouslySetInnerHTML={{ __html: converter.makeHtml(text) }}
      ></div>
    </div>
  );
};

export default LegalPage;
