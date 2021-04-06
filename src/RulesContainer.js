import React, { useState, useEffect, createContext } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Drawer,
  Button,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Grid,
  VStack,
  Text,
  Box,
  Image,
  Heading,
  Fade,
  Spinner,
  Tag,
  Link
} from '@chakra-ui/react';

import MenuDrawer from './MenuDrawer'
import RoundCard from './RoundCard'
import SvgWidget from './SvgWidget'
import StatsContainer from './StatsContainer';
import LeaderboardContainer from './LeaderboardContainer';
import CallToActionWidget from './CallToActionWidget';
import Dots from './Dots'
import LoadingWidget from './LoadingWidget'

import { useMediaQuery } from "@chakra-ui/react";

import { FiChevronLeft } from 'react-icons/fi';

import SwipeableViews from 'react-swipeable-views';

import axios from 'axios';
import jwt_decode from "jwt-decode";
import moment from 'moment';

const store = require('store');

export const PrizeContext = createContext({})

const gridStyle = {
  backgroundImage: `url("https://streaks-challenge.s3.amazonaws.com/stars_bg.png")`,
  backgroundPosition: "top center",
  backgroundSize: "contain",
  justifyContent: "center"
}

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  background: "#398FD6",
  textTransform: "uppercase"
}

const secondaryButtonStyle = {
  border: "2.5px solid #90D5FB",
  textTransform: "uppercase"
}

const redeemButtonStyle = {
  border: "2px solid #90D5FB",
  textTransform: "uppercase",
  padding: "0.25rem"
}

function RulesContainer({history}) {
  const [isDesktop] = useMediaQuery("(min-width: 775px)")

  if (isDesktop) {
    return (
      <Fade in={true}>
      <MenuDrawer activeTab={`rules`} />
        <Grid
        minH={`100vh`}
        bg={`blue.900`}
        style={gridStyle}
      >
        <Container>
          <Box p={5} style={{width: "95%", margin: "1rem auto 0 auto", textAlign: "center"}}>
            <Heading mt={3} color="white" size="xl" style={{textTransform: "uppercase", fontWeight: "800"}}>Rules</Heading>
            <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "100%",fontWeight: "500"}}>Simple rules and so many ways to win. Just come back every week during March Madness and get as many options correct as you can. Super official fine print below:</Text>
          </Box>
        </Container>
        
        <Box p={5} style={{background: "rgb(17, 30, 75)", textAlign: "center", letterSpacing: "1.25px"}}>
          <Text mt={2} color="white" fontSize="sm" mr={10} ml={10}>
            BUD LIGHT® LEGENDS: STREAK FOR THE BEER
            OFFICIAL RULES

            NO PURCHASE OR PAYMENT OF ANY KIND NECESSARY TO ENTER FOR A CHANCE TO WIN.  A PURCHASE OR PAYMENT OF ANY KIND WILL NOT INCREASE YOUR CHANCES OF WINNING.  THE CONTEST IS INTENDED FOR VIEWING IN THE FIFTY (50) UNITED STATES AND DISTRICT OF COLUMBIA ONLY AND WILL BE GOVERNED BY UNITED STATES LAW.  VOID WHERE PROHIBITED.  

            1.	ELIGIBILITY: 

            The “Bud Light Legends: Streak for the Beer” (“Contest”) is open to legal residents of the fifty (50) United States and District of Columbia who are twenty-one (21) years of age or older at the time of entry.  Employees, contractors, directors, officers and agents of Anheuser-Busch, LLC, its affiliates and subsidiaries, advertising and promotion agencies, wholesale distributors, retail licensees, and all other service agencies involved with the Contest, members of their immediate family (spouse, parent, child or sibling), are not eligible to enter or win.  The Contest is subject to all applicable federal, state and local laws and regulations and is void where prohibited.  Participation constitutes participant’s full and unconditional agreement to these Official Rules and Sponsor’s and Administrator’s decisions which are final and binding in all matters related to this Contest. Winning a prize is contingent upon fulfilling all requirements as set forth herein.  

            2.	CONTEST PERIOD:  

            Contest begins at 6:00:00 p.m. Eastern Daylight Time (“EDT”) on March 14, 2021 and ends at the tip-off of the Championship game scheduled to occur on April 5, 2021.   The Contest Period is divided into six (6) entry periods (each an “Entry Period”) as defined in the chart below.  Administrator’s computer is the official time keeping device for this Contest.



            3.	HOW TO PARTICIPATE:

            Step 1:  Create an Account:

            During the Contest Period, visit Streakforthebeer.budlight.com (“Website”) and follow the online instructions to complete and submit the online registration form and create an Account (“Account”).  Limit one (1) Account per person.

            Step 2:  How to Enter and Earn a Bonus Point:

            How to Enter:  During each Entry Period, follow the online instructions to submit your predictions to the outcome of the five (5) scenarios located on your “Pick ‘Em” page (“Entry”).  You may not change your predictions after you submit your Entry.  All Entries must be received and recorded during the Contest Period.  Limit one (1) Entry per person per Entry Period.

            How to earn a Bonus Point:  You may earn one (1) Bonus Point per Entry Period as defined below.  Limit one (1) Bonus Point per person per Entry Period.

            (1)  For residents of the fifty (50) United States and District of Columbia:  During each Entry Period, follow the online instructions to "Refer a Friend” (“Friend”).  Your Friend must register for the Contest by creating an Account as defined above.  Upon verification that your Friend has created an Account, you will receive one (1) bonus point (a “Bonus Point”).     

            (2)  For residents of AK, AZ, CO, DC, DE, FL, GA, ID, IL, IA, LA, MD, MI, MS, MT, ND, NH, NM, NY, NV, OK, OR, SC, TN, VT, WA, WI and WY: Drizly: During the Contest Period, log into your Drizly account, purchase any one (1) Bud Light product and keep your receipt.  During each Entry Period, follow the online instructions to submit your order ID included on your receipt. Upon verification, you will receive one (1) bonus point (also a “Bonus Point”).  

            For all Entries and Bonus Points:  If entering with a mobile phone or other web-enabled device and using your wireless carrier’s network, standard data charges from your wireless carrier may apply.  Check with your wireless service provider for details on these and any other applicable charges. Participants are solely responsible for any such wireless charges.  
            Step 3:  Set a Streak and Earn Points:

            Each participant starts with a streak (“Streak”) of zero (0).  

            Entry Period 1:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.  Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

            Entry Period 2:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.  Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

            Entry Period 3:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.  Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

            Entry Period 4:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.   Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

            Entry Period 5:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.  Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

            Entry Period 6:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.  Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

            Streak and Point Totals:

            Streaks:  Participants can earn a maximum of one (1) Streak per Entry Period for a total of six (6) Streaks.

            Streaks:  Participants who do not earn a Streak per Entry Period have their ("Streaks") set back to zero (0). 

            Points:  Participants can earn a maximum of five (5) points per Entry Period for a total of thirty (30) points.  Participants can earn one (1) Bonus Point per Entry Period for a total of six (6) points.  The maximum amount of points that a participant can earn during the Contest Period is thirty-six (36) points.  

            4.	REDEEM STREAKS FOR PRIZES & PERFECT STREAK PRIZE:

            Perfect Streak Prize:

            Each participant who earns six (6) Streaks will receive one (1) $600.00 pre-paid card that can be used to purchase two (2) 24-pack of Bud Light beer per month for twelve (12) months.  Alcohol beverages are not part of the prize.  Terms and Conditions received with pre-paid card apply.  ARV is $600.00.  

            Participants can redeem their Streaks to receive prizes as follows:

            Five (5) Streaks:

            Participants can redeem five (5) Streaks for one (1) of the following prizes (while supplies last):

            One (1) Bud Light Summer Jersey.  Approximate Retail Value (“ARV”) is $48.00.

            One (1) Bud Light Coaches Jacket.  ARV is $50.00.

            One (1) Bud Light Neon.  ARV is $118.25.

            Once a participant has redeemed their five (5) Streaks, their Streak is reset to zero (0).  

            Four (4) Streaks:

            Participants can redeem four (4) Streaks for one (1) of the following prizes (while supplies last):

            One (1) Bud Light Hat.  ARV is $35.00.

            One (1) Bud Light Tailgate Chair.  ARV is $16.00.

            One (1) Bud Light Crewneck Sweatshirt.  ARV is $22.00.

            Once a participant has redeemed their four (4) Streaks, their Streak is reset to zero (0).  

            Three (3) Streaks:

            Participants can redeem three (3) Streaks for one (1) of the following prizes (while supplies last):

            One (1) Bud Light Visor.  ARV is $5.75.

            One (1) Bud Light T-shirt.  ARV is $9.50.

            For residents of the United States and District of Columbia (excluding California and Texas residents):  One-thousand (1,000) My Cooler Rewards points.  ARV is $100.00. 

            Once a participant has redeemed their three (3) Streaks, their Streak is reset to zero (0).  

            Two (2) Streaks:

            Participants can redeem two (2) Streaks for one (1) of the following prizes (while supplies last):

            One (1) Bud Light Bottle Opener.  ARV is $1.45.

            For residents of the United States and District of Columbia (excluding AL, CA, CT, KY, ME, MO, PH, OH and OK):  One (1) $5.00 Drizly code.  Code applies to gratuity, tax and delivery only.  Code cannot be combined with any other offer.  Valid for new Drizly user only.  Code is subject to the terms and conditions located at www.drizly.com.  Code expires at 11:59 p.m. EST on December 31, 2021.  

            For residents of the United States and District of Columbia (excluding California and Texas residents):  Five-hundred (500) My Cooler Rewards points.  ARV is $50.00. 

            Once a participant has redeemed their two (2) Streaks, their Streak is reset to zero (0).  

            5.	DETERMINATION OF GRAND PRIZE WINNER AND GRAND PRIZE:

            The Grand Prize will be awarded to the one (1) participant who scored the highest number of points during the Contest Period.  In the event of a tie, a random drawing will be conducted from among all tied participants by Administrator to determine the one (1) Grand Prize winner. Administrator’s decisions are final in all matters relating to this Contest.  

            Grand Prize (1 total):  Winner will receive a “2022 March Hoops” experience in New Orleans, Louisiana.  Prize consists of two (2) consecutive nights double-occupancy hotel accommodations for winner and one (1) guest.  Winner will also receive one (1) $2,600.00 pre-paid card that can be used for travel expenses and incidental expenses. Terms and conditions received with delivery of pre-paid cards apply.  Accommodations are at the Sponsor’s discretion and subject to availability and change.  Winer may be required to provide a credit card at time of hotel check-in.  Any costs incurred due to changes to the original itinerary are solely the winner’s responsibility.  Air transportation, ground transportation, meals, gratuities, personal purchases and all other expenses not specified herein are solely the winner’s responsibility.  ARV is $3,400.00.  If winner cannot accept the prize as specified, prize will be forfeited and may be awarded to an alternate winner at Sponsor’s sole discretion (time permitting).  If the prize cannot be awarded for any reason including Acts of God, acts of terrorism, civil disturbances, work stoppage, COVID-19 or any other natural disaster outside of Sponsor’s control, then one (1) $3,400.00 pre-paid card will be awarded.  Any difference between stated value and actual value will not be awarded. 

            Prizes are non-transferable and no cash equivalent or substitution of prize is offered, except at the sole discretion of Sponsor.  If a prize, or any portion thereof, cannot be awarded for any reason, Sponsor reserves the right to substitute prize with another prize of equal or greater value.  Prize winners will be solely responsible for all federal, state and/or local taxes, and for any other fees or costs associated with the prizes they receive, regardless of whether it, in whole or in part, is used.  

            If Sponsor so elects, potential winner and his/her one (1) guest may be required to submit to a confidential background check.  Such background check may include (but is not limited to) investigation of criminal, sexual offenses, or other arrest or conviction record, and any other factor deemed relevant by the Sponsor to help ensure that potential winner and his/her one (1) guest will not bring the Sponsor into public disrepute, contempt, scandal or ridicule or reflect unfavorably on the Sponsor.  If requested, potential winner and his/her one (1) guest agree to sign waiver forms authorizing the release of personal and background information.  In the event of noncompliance, to be determined at the sole discretion of Sponsor, prize will be forfeited and may be awarded to an alternate winner at Sponsor’s sole discretion.

            6.	WINNER NOTIFICATION:  

            Potential winners will be notified by email or phone call and will be required to respond to the notification within forty-eight (48) hours indicating whether they can accept the prize. If a potential winner does not respond to the notification within the forty-eight (48) hour time period, prize will be forfeited and may be awarded to an alternate winner at Sponsor’s sole discretion (time permitting for Grand Prize).  Any alternate potential winner selected will also be required to respond to the notification within the time frame stated above.

            Potential Grand Prize winner will be required to complete, sign and return an affidavit of eligibility and liability and, unless prohibited by law, publicity release to Sponsor or Sponsor’s representative within five (5) days of prize acceptance.  Potential Perfect Week Prize winner and Perfect Streak Prize may be required to complete, sign and return an affidavit of eligibility and liability and, unless prohibited by law, publicity release to Sponsor or Sponsor’s representative within five (5) days of prize acceptance.  Subject to verification of eligibility and compliance with the terms of these Official Rules, including verification that the winner is twenty-one (21) years of age or older, the potential winner will be declared an official winner of the Contest. If Sponsor cannot verify that the potential winner is twenty-one (21) years of age or older prior to winner notification, the potential winner will be disqualified and an alternate potential winner may be selected at Sponsor’s sole discretion (time permitting for Grand Prize).  

            Grand Prize winner’s one (1) guest must be twenty-one (21) years of age or older as of the end date of the Contest Period and will be required to complete, sign, and return a liability and, where permitted by law, publicity release via email, fax or overnight mail within five (5) days of prize acceptance.  Grand Prize winner’s one (1) guest will also be required to complete, sign and return a Release of Liability, Voluntary Assumption of Risk, and Indemnity Agreement to Sponsor or Sponsor’s representatives within five (5) days of prize acceptance.

            In the event of noncompliance within any stated time period, the prize will be forfeited and an alternate potential winner may be selected at Sponsor’s sole discretion (time permitting for Grand Prize).  Any alternate potential winner selected will also be required to adhere to the time periods described herein. Any prize notification or prize returned to the Sponsor or its agencies as undeliverable will result in disqualification and the prize may be awarded to an alternate winner at Sponsor’s sole discretion (time permitting).  

              Released Parties (as defined below) are not responsible for suspended or discontinued Internet, wireless, or land-line phone service or a change in an participant’s email, phone number or mailing address which may result in a potential winner not receiving initial prize notification or his/her prize information. 

            7.	PUBLICITY:  

            Acceptance of prize offered constitutes permission for Sponsor to use winner’s name, voice, biographical information and/or likeness for purposes of advertising and promotion without further compensation in all media now known or hereafter discovered worldwide and on the Internet without notice or review or approval as permitted by law. 

            8.	RELEASE:  

            By accepting a prize, winners agree to release and hold Anheuser-Busch, LLC and Administrator harmless from all losses, damages, rights, claims and actions of any kind resulting from acceptance, possession or use of any prize, including without limitation, personal injuries, death and property damage.  

            9.	GENERAL CONDITIONS: 

            Anheuser-Busch, LLC, Administrator and each of their respective affiliates, subsidiaries, and agencies (collective the “Released Parties”) are not responsible for lost, late, misdirected, unintelligible, returned or undelivered entries, telephone calls, text messages, email, or for lost, interrupted or unavailable satellite, network, server, Internet Service Provider (ISP), Website, or other connections availability, accessibility or traffic congestion, miscommunications, failed computer, network, telephone, satellite or cable hardware or software or lines, or technical failure, or jumbled, scrambled, delayed or misdirected transmissions, computer hardware or software malfunctions, failures or difficulties, or other errors of any kind whether human, mechanical, electronic or network.  Persons who tamper with or abuse any aspect of this Contest or Website, or act in violation of the Official Rules, or act in any manner to threaten or abuse or harass any person, or violate Website’s terms of service, as solely determined by the Sponsor or Administrator, will be disqualified. Released Parties are not responsible for any incorrect or inaccurate information whether caused by Website users, tampering, hacking, or by any of the programming or equipment associated with or used in this Contest, and assumes no responsibility for any errors, omission, deletion, interruption or delay in operation or transmission or communication line failure, theft or destruction or unauthorized website access.  Any use of robotic, macro, automatic, programmed or like entry methods will void all such entries, and may subject that participant to disqualification.  Released Parties are not responsible for injury or damage to participant's or any other person’s computer or property related to or resulting from participating in this Contest.  Should any portion of Contest be, in the Sponsor’s or Administrator’s sole opinion, compromised by virus, worms, bugs, unauthorized human intervention or other causes which, in the sole opinion of the Sponsor, corrupt or impair administration, security, fairness or proper play of this Contest, or submission of entries, Sponsor and Administrator reserve the right at their sole discretion to suspend, modify or terminate the Contest, and randomly select the winner from valid entries received prior to action taken, or otherwise as may be deemed fair and equitable by the Sponsor. In the event of a dispute regarding the identity of an online participant, the authorized subscriber of the email address used to enter will be deemed to be the participant, and must comply with these rules.  The authorized account subscriber is the natural person who is assigned the email address by the ISP or other organization responsible for assigning email addresses.  All materials submitted become the property of Anheuser-Busch, LLC and will not be returned.  SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL, CONSEQUENTIAL, OR OTHER DAMAGES; AS A RESULT, THE ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU, AND THE FOREGOING PARAGRAPHS SHALL NOT APPLY TO A RESIDENT OF NEW JERSEY TO THE EXTENT DAMAGES TO SUCH NEW JERSEY RESIDENT ARE THE RESULT OF SPONSOR’S OR ADMINISTORATOR’S NEGLIGENT, FRAUDULENT OR RECKLESS ACT(S) OR INTENTIONAL MISCONDUCT.  

            10. 	DISPUTE RESOLUTION: 

            All issues and questions concerning the construction, validity, interpretation and enforceability of these Official Rules, or the rights and obligations of the participant, Administrator and Sponsor in connection with the Contest, or any claim or dispute that has arisen or may arise between you, Administrator and Sponsor, shall be governed by, and construed in accordance with, the laws of the State of Missouri without giving effect to any choice of law or conflict of law rules.  The place of arbitration shall be St. Louis, Missouri.

            11.	PRIVACY POLICY:

            See Sponsor’s privacy policy located at https://www.budlight.com/en/privacy-policy.html for details regarding the use of personal information collected in connection with this Contest.  If you are verified as a prize winner, your first name, last initial, city and state will be included in a publicly available winner’s list.

            12.	SPONSOR: 

            Anheuser-Busch, LLC, One Busch Place, St. Louis, MO 63118. 

            13.	ADMINISTRATOR: 

            160over90, 5140 Walnut Park Drive, Brentwood TN 37027.

            14.	WINNER’S LIST:  

            For the names of the winners, hand-print your name and complete address on a 3” x 5” card and mail to: Bud Light Legends: Streak for the Beer Winners List Request, c/o 160over90, 5140 Walnut Park Drive, Brentwood TN 37027, for receipt by June 5, 2021.   

            © 2021 Anheuser-Busch, Bud Light® Beer, St. Louis, MO
          </Text>
        </Box>
        <Box mt={10} mb={5} style={{textAlign: "center"}}>
          <Text color="white" fontSize="md">In Partnership With</Text>
          <Image boxSize="50px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly" style={{margin: "1rem auto"}}/>
        </Box>
      </Grid>
      </Fade>
    );
  }

  return (
    <Fade in={true}>
    <MenuDrawer activeTab={`rules`} />
      <Grid
      minH={`100vh`}
      bg={`blue.900`}
      style={gridStyle}
    >
      <Box mt={5} ml={5} style={{display: "flex", alignItems: "center"}} onClick={() => history.push(`/dashboard`)}>
        <FiChevronLeft color={`white`} style={{marginRight: "2.5px"}}/>
        <Text color={`white`} fontSize={`sm`} style={{fontWeight: "600", textTransform: "uppercase", textDecoration: "underline"}}>Back</Text>
      </Box>
      <Container>
        <Box style={{width: "75%", margin: "1rem auto 0 auto", textAlign: "center"}}>
          <Heading mt={3} color="white" size="xl" style={{textTransform: "uppercase", fontWeight: "800"}}>Rules</Heading>
          <Text mt={3} mb={3} color="white" fontSize={`sm`} style={{width: "100%",fontWeight: "500"}}>Simple rules and so many ways to win. Just come back every week during March Madness and get as many options correct as you can. Super official fine print below:</Text>
        </Box>
      </Container>
      
      <Container style={{background: "rgb(17, 30, 75)", textAlign: "center"}}>
      <Box p={5}>
        <Text mt={2} color="white" fontSize="sm">
          BUD LIGHT® LEGENDS: STREAK FOR THE BEER
          OFFICIAL RULES

          NO PURCHASE OR PAYMENT OF ANY KIND NECESSARY TO ENTER FOR A CHANCE TO WIN.  A PURCHASE OR PAYMENT OF ANY KIND WILL NOT INCREASE YOUR CHANCES OF WINNING.  THE CONTEST IS INTENDED FOR VIEWING IN THE FIFTY (50) UNITED STATES AND DISTRICT OF COLUMBIA ONLY AND WILL BE GOVERNED BY UNITED STATES LAW.  VOID WHERE PROHIBITED.  

          1.	ELIGIBILITY: 

          The “Bud Light Legends: Streak for the Beer” (“Contest”) is open to legal residents of the fifty (50) United States and District of Columbia who are twenty-one (21) years of age or older at the time of entry.  Employees, contractors, directors, officers and agents of Anheuser-Busch, LLC, its affiliates and subsidiaries, advertising and promotion agencies, wholesale distributors, retail licensees, and all other service agencies involved with the Contest, members of their immediate family (spouse, parent, child or sibling), are not eligible to enter or win.  The Contest is subject to all applicable federal, state and local laws and regulations and is void where prohibited.  Participation constitutes participant’s full and unconditional agreement to these Official Rules and Sponsor’s and Administrator’s decisions which are final and binding in all matters related to this Contest. Winning a prize is contingent upon fulfilling all requirements as set forth herein.  

          2.	CONTEST PERIOD:  

          Contest begins at 6:00:00 p.m. Eastern Daylight Time (“EDT”) on March 14, 2021 and ends at the tip-off of the Championship game scheduled to occur on April 5, 2021.   The Contest Period is divided into six (6) entry periods (each an “Entry Period”) as defined in the chart below.  Administrator’s computer is the official time keeping device for this Contest.



          3.	HOW TO PARTICIPATE:

          Step 1:  Create an Account:

          During the Contest Period, visit Streakforthebeer.budlight.com (“Website”) and follow the online instructions to complete and submit the online registration form and create an Account (“Account”).  Limit one (1) Account per person.

          Step 2:  How to Enter and Earn a Bonus Point:

          How to Enter:  During each Entry Period, follow the online instructions to submit your predictions to the outcome of the five (5) scenarios located on your “Pick ‘Em” page (“Entry”).  You may not change your predictions after you submit your Entry.  All Entries must be received and recorded during the Contest Period.  Limit one (1) Entry per person per Entry Period.

          How to earn a Bonus Point:  You may earn one (1) Bonus Point per Entry Period as defined below.  Limit one (1) Bonus Point per person per Entry Period.

          (1)  For residents of the fifty (50) United States and District of Columbia:  During each Entry Period, follow the online instructions to "Refer a Friend” (“Friend”).  Your Friend must register for the Contest by creating an Account as defined above.  Upon verification that your Friend has created an Account, you will receive one (1) bonus point (a “Bonus Point”).     

          (2)  For residents of AK, AZ, CO, DC, DE, FL, GA, ID, IL, IA, LA, MD, MI, MS, MT, ND, NH, NM, NY, NV, OK, OR, SC, TN, VT, WA, WI and WY: Drizly: During the Contest Period, log into your Drizly account, purchase any one (1) Bud Light product and keep your receipt.  During each Entry Period, follow the online instructions to submit your order ID included on your receipt. Upon verification, you will receive one (1) bonus point (also a “Bonus Point”).  

          For all Entries and Bonus Points:  If entering with a mobile phone or other web-enabled device and using your wireless carrier’s network, standard data charges from your wireless carrier may apply.  Check with your wireless service provider for details on these and any other applicable charges. Participants are solely responsible for any such wireless charges.  
          Step 3:  Set a Streak and Earn Points:

          Each participant starts with a streak (“Streak”) of zero (0).  

          Entry Period 1:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.  Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

          Entry Period 2:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.  Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

          Entry Period 3:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.  Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

          Entry Period 4:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.   Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

          Entry Period 5:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.  Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

          Entry Period 6:  Each participant who answered two (2) out of the five scenarios correctly and earned one (1) Bonus Point will earn one (1) Streak and three (3) points.  Each participant who answered three (3) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of three (3) points.  Each participant who answered four (4) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of four (4) points.  Each participant who answered five (5) out of five (5) scenarios correctly will earn one (1) Streak and one (1) point for each correct answer for a total of five (5) points.  No Streaks or points will be awarded to participants who only answered one (1) out of the five (5) scenarios correctly; or, who answered two (2) out of the five (5) scenarios correctly but did not earn one (1) Bonus Point.  

          Streak and Point Totals:

          Streaks:  Participants can earn a maximum of one (1) Streak per Entry Period for a total of six (6) Streaks.

          Points:  Participants can earn a maximum of five (5) points per Entry Period for a total of thirty (30) points.  Participants can earn one (1) Bonus Point per Entry Period for a total of six (6) points.  The maximum amount of points that a participant can earn during the Contest Period is thirty-six (36) points.  

          4.	REDEEM STREAKS FOR PRIZES & PERFECT STREAK PRIZE:

          Perfect Streak Prize:

          Each participant who earns six (6) Streaks will receive one (1) $600.00 pre-paid card that can be used to purchase two (2) 24-pack of Bud Light beer per month for twelve (12) months.  Alcohol beverages are not part of the prize.  Terms and Conditions received with pre-paid card apply.  ARV is $600.00.  

          Participants can redeem their Streaks to receive prizes as follows:

          Five (5) Streaks:

          Participants can redeem five (5) Streaks for one (1) of the following prizes (while supplies last):

          One (1) Bud Light Summer Jersey.  Approximate Retail Value (“ARV”) is $48.00.

          One (1) Bud Light Coaches Jacket.  ARV is $50.00.

          One (1) Bud Light Neon.  ARV is $118.25.

          Once a participant has redeemed their five (5) Streaks, their Streak is reset to zero (0).  

          Four (4) Streaks:

          Participants can redeem four (4) Streaks for one (1) of the following prizes (while supplies last):

          One (1) Bud Light Hat.  ARV is $35.00.

          One (1) Bud Light Tailgate Chair.  ARV is $16.00.

          One (1) Bud Light Crewneck Sweatshirt.  ARV is $22.00.

          Once a participant has redeemed their four (4) Streaks, their Streak is reset to zero (0).  

          Three (3) Streaks:

          Participants can redeem three (3) Streaks for one (1) of the following prizes (while supplies last):

          One (1) Bud Light Visor.  ARV is $5.75.

          One (1) Bud Light T-shirt.  ARV is $9.50.

          For residents of the United States and District of Columbia (excluding California and Texas residents):  One-thousand (1,000) My Cooler Rewards points.  ARV is $100.00. 

          Once a participant has redeemed their three (3) Streaks, their Streak is reset to zero (0).  

          Two (2) Streaks:

          Participants can redeem two (2) Streaks for one (1) of the following prizes (while supplies last):

          One (1) Bud Light Bottle Opener.  ARV is $1.45.

          For residents of the United States and District of Columbia (excluding AL, CA, CT, KY, ME, MO, PH, OH and OK):  One (1) $5.00 Drizly code.  Code applies to gratuity, tax and delivery only.  Code cannot be combined with any other offer.  Valid for new Drizly user only.  Code is subject to the terms and conditions located at www.drizly.com.  Code expires at 11:59 p.m. EST on December 31, 2021.  

          For residents of the United States and District of Columbia (excluding California and Texas residents):  Five-hundred (500) My Cooler Rewards points.  ARV is $50.00. 

          Once a participant has redeemed their two (2) Streaks, their Streak is reset to zero (0).  

          5.	DETERMINATION OF GRAND PRIZE WINNER AND GRAND PRIZE:

          The Grand Prize will be awarded to the one (1) participant who scored the highest number of points during the Contest Period.  In the event of a tie, a random drawing will be conducted from among all tied participants by Administrator to determine the one (1) Grand Prize winner. Administrator’s decisions are final in all matters relating to this Contest.  

          Grand Prize (1 total):  Winner will receive a “2022 March Hoops” experience in New Orleans, Louisiana.  Prize consists of two (2) consecutive nights double-occupancy hotel accommodations for winner and one (1) guest.  Winner will also receive one (1) $2,600.00 pre-paid card that can be used for travel expenses and incidental expenses. Terms and conditions received with delivery of pre-paid cards apply.  Accommodations are at the Sponsor’s discretion and subject to availability and change.  Winer may be required to provide a credit card at time of hotel check-in.  Any costs incurred due to changes to the original itinerary are solely the winner’s responsibility.  Air transportation, ground transportation, meals, gratuities, personal purchases and all other expenses not specified herein are solely the winner’s responsibility.  ARV is $3,400.00.  If winner cannot accept the prize as specified, prize will be forfeited and may be awarded to an alternate winner at Sponsor’s sole discretion (time permitting).  If the prize cannot be awarded for any reason including Acts of God, acts of terrorism, civil disturbances, work stoppage, COVID-19 or any other natural disaster outside of Sponsor’s control, then one (1) $3,400.00 pre-paid card will be awarded.  Any difference between stated value and actual value will not be awarded. 

          Prizes are non-transferable and no cash equivalent or substitution of prize is offered, except at the sole discretion of Sponsor.  If a prize, or any portion thereof, cannot be awarded for any reason, Sponsor reserves the right to substitute prize with another prize of equal or greater value.  Prize winners will be solely responsible for all federal, state and/or local taxes, and for any other fees or costs associated with the prizes they receive, regardless of whether it, in whole or in part, is used.  

          If Sponsor so elects, potential winner and his/her one (1) guest may be required to submit to a confidential background check.  Such background check may include (but is not limited to) investigation of criminal, sexual offenses, or other arrest or conviction record, and any other factor deemed relevant by the Sponsor to help ensure that potential winner and his/her one (1) guest will not bring the Sponsor into public disrepute, contempt, scandal or ridicule or reflect unfavorably on the Sponsor.  If requested, potential winner and his/her one (1) guest agree to sign waiver forms authorizing the release of personal and background information.  In the event of noncompliance, to be determined at the sole discretion of Sponsor, prize will be forfeited and may be awarded to an alternate winner at Sponsor’s sole discretion.

          6.	WINNER NOTIFICATION:  

          Potential winners will be notified by email or phone call and will be required to respond to the notification within forty-eight (48) hours indicating whether they can accept the prize. If a potential winner does not respond to the notification within the forty-eight (48) hour time period, prize will be forfeited and may be awarded to an alternate winner at Sponsor’s sole discretion (time permitting for Grand Prize).  Any alternate potential winner selected will also be required to respond to the notification within the time frame stated above.

          Potential Grand Prize winner will be required to complete, sign and return an affidavit of eligibility and liability and, unless prohibited by law, publicity release to Sponsor or Sponsor’s representative within five (5) days of prize acceptance.  Potential Perfect Week Prize winner and Perfect Streak Prize may be required to complete, sign and return an affidavit of eligibility and liability and, unless prohibited by law, publicity release to Sponsor or Sponsor’s representative within five (5) days of prize acceptance.  Subject to verification of eligibility and compliance with the terms of these Official Rules, including verification that the winner is twenty-one (21) years of age or older, the potential winner will be declared an official winner of the Contest. If Sponsor cannot verify that the potential winner is twenty-one (21) years of age or older prior to winner notification, the potential winner will be disqualified and an alternate potential winner may be selected at Sponsor’s sole discretion (time permitting for Grand Prize).  

          Grand Prize winner’s one (1) guest must be twenty-one (21) years of age or older as of the end date of the Contest Period and will be required to complete, sign, and return a liability and, where permitted by law, publicity release via email, fax or overnight mail within five (5) days of prize acceptance.  Grand Prize winner’s one (1) guest will also be required to complete, sign and return a Release of Liability, Voluntary Assumption of Risk, and Indemnity Agreement to Sponsor or Sponsor’s representatives within five (5) days of prize acceptance.

          In the event of noncompliance within any stated time period, the prize will be forfeited and an alternate potential winner may be selected at Sponsor’s sole discretion (time permitting for Grand Prize).  Any alternate potential winner selected will also be required to adhere to the time periods described herein. Any prize notification or prize returned to the Sponsor or its agencies as undeliverable will result in disqualification and the prize may be awarded to an alternate winner at Sponsor’s sole discretion (time permitting).  

            Released Parties (as defined below) are not responsible for suspended or discontinued Internet, wireless, or land-line phone service or a change in an participant’s email, phone number or mailing address which may result in a potential winner not receiving initial prize notification or his/her prize information. 

          7.	PUBLICITY:  

          Acceptance of prize offered constitutes permission for Sponsor to use winner’s name, voice, biographical information and/or likeness for purposes of advertising and promotion without further compensation in all media now known or hereafter discovered worldwide and on the Internet without notice or review or approval as permitted by law. 

          8.	RELEASE:  

          By accepting a prize, winners agree to release and hold Anheuser-Busch, LLC and Administrator harmless from all losses, damages, rights, claims and actions of any kind resulting from acceptance, possession or use of any prize, including without limitation, personal injuries, death and property damage.  

          9.	GENERAL CONDITIONS: 

          Anheuser-Busch, LLC, Administrator and each of their respective affiliates, subsidiaries, and agencies (collective the “Released Parties”) are not responsible for lost, late, misdirected, unintelligible, returned or undelivered entries, telephone calls, text messages, email, or for lost, interrupted or unavailable satellite, network, server, Internet Service Provider (ISP), Website, or other connections availability, accessibility or traffic congestion, miscommunications, failed computer, network, telephone, satellite or cable hardware or software or lines, or technical failure, or jumbled, scrambled, delayed or misdirected transmissions, computer hardware or software malfunctions, failures or difficulties, or other errors of any kind whether human, mechanical, electronic or network.  Persons who tamper with or abuse any aspect of this Contest or Website, or act in violation of the Official Rules, or act in any manner to threaten or abuse or harass any person, or violate Website’s terms of service, as solely determined by the Sponsor or Administrator, will be disqualified. Released Parties are not responsible for any incorrect or inaccurate information whether caused by Website users, tampering, hacking, or by any of the programming or equipment associated with or used in this Contest, and assumes no responsibility for any errors, omission, deletion, interruption or delay in operation or transmission or communication line failure, theft or destruction or unauthorized website access.  Any use of robotic, macro, automatic, programmed or like entry methods will void all such entries, and may subject that participant to disqualification.  Released Parties are not responsible for injury or damage to participant's or any other person’s computer or property related to or resulting from participating in this Contest.  Should any portion of Contest be, in the Sponsor’s or Administrator’s sole opinion, compromised by virus, worms, bugs, unauthorized human intervention or other causes which, in the sole opinion of the Sponsor, corrupt or impair administration, security, fairness or proper play of this Contest, or submission of entries, Sponsor and Administrator reserve the right at their sole discretion to suspend, modify or terminate the Contest, and randomly select the winner from valid entries received prior to action taken, or otherwise as may be deemed fair and equitable by the Sponsor. In the event of a dispute regarding the identity of an online participant, the authorized subscriber of the email address used to enter will be deemed to be the participant, and must comply with these rules.  The authorized account subscriber is the natural person who is assigned the email address by the ISP or other organization responsible for assigning email addresses.  All materials submitted become the property of Anheuser-Busch, LLC and will not be returned.  SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL, CONSEQUENTIAL, OR OTHER DAMAGES; AS A RESULT, THE ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU, AND THE FOREGOING PARAGRAPHS SHALL NOT APPLY TO A RESIDENT OF NEW JERSEY TO THE EXTENT DAMAGES TO SUCH NEW JERSEY RESIDENT ARE THE RESULT OF SPONSOR’S OR ADMINISTORATOR’S NEGLIGENT, FRAUDULENT OR RECKLESS ACT(S) OR INTENTIONAL MISCONDUCT.  

          10. 	DISPUTE RESOLUTION: 

          All issues and questions concerning the construction, validity, interpretation and enforceability of these Official Rules, or the rights and obligations of the participant, Administrator and Sponsor in connection with the Contest, or any claim or dispute that has arisen or may arise between you, Administrator and Sponsor, shall be governed by, and construed in accordance with, the laws of the State of Missouri without giving effect to any choice of law or conflict of law rules.  The place of arbitration shall be St. Louis, Missouri.

          11.	PRIVACY POLICY:

          See Sponsor’s privacy policy located at https://www.budlight.com/en/privacy-policy.html for details regarding the use of personal information collected in connection with this Contest.  If you are verified as a prize winner, your first name, last initial, city and state will be included in a publicly available winner’s list.

          12.	SPONSOR: 

          Anheuser-Busch, LLC, One Busch Place, St. Louis, MO 63118. 

          13.	ADMINISTRATOR: 

          160over90, 5140 Walnut Park Drive, Brentwood TN 37027.

          14.	WINNER’S LIST:  

          For the names of the winners, hand-print your name and complete address on a 3” x 5” card and mail to: Bud Light Legends: Streak for the Beer Winners List Request, c/o 160over90, 5140 Walnut Park Drive, Brentwood TN 37027, for receipt by June 5, 2021.   

          © 2021 Anheuser-Busch, Bud Light® Beer, St. Louis, MO
        </Text>
      </Box>
      <Box mt={10} mb={5} style={{textAlign: "center"}}>
        <Text color="white" fontSize="md">In Partnership With</Text>
        <Image boxSize="50px" src="https://streaks-challenge.s3.amazonaws.com/drizly_logo.png" alt="Drizly" style={{margin: "1rem auto"}}/>
      </Box>
      </Container>
    </Grid>
    </Fade>
  );
}

export default withRouter(RulesContainer);
