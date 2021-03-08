import React, { Fragment, useState, useEffect, useContext, createContext } from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Badge,
  Text,
  Image
} from '@chakra-ui/react';

import PicksContainer from './PicksContainer'
import PreviousResultsContainer from './PreviousResultsContainer';

import { useDisclosure } from "@chakra-ui/react";
import { CalendarIcon } from '@chakra-ui/icons';
import { FaCheckCircle } from "react-icons/fa";

import axios from 'axios';

const buttonStyle = {
  border: "2.5px solid #90D5FB",
  background: "#398FD6",
  textTransform: "uppercase"
}

const cardStyle = {
  border: "2.5px solid #90D5FB",
  boxShadow: "0 0 5px #90d5fb",
  background: "#111e4b",
  position: "relative"
}

const drawerContentStyle = { 
  background: "#111e4b",
  border: "2.5px solid #90D5FB",
  borderBottom: "none",
  boxShadow: "0 0 5px #90d5fb",
  borderRadius: "15px 15px 0 0"
}

const paths = [
  {
    round: "1st Round",
    text: "M38.2357 139V131.6H35.1357V133.19H36.3457V139H38.2357ZM45.7173 133.76C45.7073 132.77 45.3273 132.18 44.5373 131.77C44.1473 131.57 43.7173 131.46 43.2273 131.46C41.8673 131.46 40.6473 132.38 40.6473 133.64C40.6473 134.6 41.1973 135.24 42.4073 135.73C43.0773 136 43.8973 136.26 43.8973 136.85C43.8973 137.25 43.5773 137.56 43.1873 137.56C42.7173 137.56 42.4173 137.16 42.4073 136.55H40.5273V136.71C40.5273 138.3 41.5873 139.14 43.1973 139.14C44.7973 139.14 45.7773 138.3 45.7773 136.87C45.7773 135.9 45.3673 135.31 43.7373 134.61C42.9273 134.26 42.5273 134.06 42.5273 133.62C42.5273 133.29 42.8273 133.04 43.1773 133.04C43.5473 133.04 43.7673 133.23 43.8473 133.76H45.7173ZM49.4598 139V133.26H50.9098V131.6H46.1098V133.26H47.5698V139H49.4598Z",
    path: "M84.6208 154.379C81.4619 157.538 76.3012 157.562 73.5007 154.082C69.0376 148.535 65.3783 142.37 62.6432 135.767C58.8741 126.667 56.9342 116.914 56.9342 107.065H73.1117C73.1117 114.79 74.6332 122.439 77.5893 129.576C79.5109 134.215 82.0143 138.578 85.0314 142.565C87.7274 146.127 87.7796 151.22 84.6208 154.379Z",
    active: false,
    complete: false,
    winner: false,
    inactive_outline: "#398FD6",
    active_outline: "white",
    streak_win: "#398FD6",
    streak_loss: "#EB5757"
  },
  {
    round: "2nd Round",
    text: "M40.5386 79V77.41H38.0286C39.8386 75.86 40.4886 74.79 40.4886 73.61C40.4886 72.44 39.4786 71.46 37.9686 71.46C36.3186 71.46 35.2486 72.56 35.2486 74.29H37.0486C37.0886 73.49 37.3786 73.12 37.8986 73.12C38.3086 73.12 38.5986 73.41 38.5986 73.84C38.5986 74.41 38.1386 75.17 37.2986 76.02C36.8886 76.44 36.2286 76.94 35.3186 77.53V79H40.5386ZM47.9002 79V71.6H46.0902L46.1702 76.28L43.2902 71.6H41.6602V79H43.4702L43.4202 74.48L46.2602 79H47.9002ZM51.7981 79C54.1081 79 55.5481 77.74 55.5481 75.3C55.5481 73.79 54.8881 72.65 53.8381 72.05C53.3181 71.76 52.5881 71.6 51.6681 71.6H49.1481V79H51.7981ZM51.0381 77.34V73.26H51.8981C52.9881 73.26 53.6581 73.99 53.6581 75.31C53.6581 76.66 52.9781 77.34 51.8881 77.34H51.0381Z",
    path: "M56.934 107.062C56.934 97.2134 58.8739 87.4607 62.643 78.3612C66.4121 69.2618 71.9366 60.9939 78.901 54.0295L90.3402 65.4687C84.878 70.9309 80.5452 77.4154 77.5891 84.5521C74.633 91.6888 73.1115 99.3378 73.1115 107.062H56.934Z",
    active: false,
    complete: false,
    winner: false,
    inactive_outline: "#398FD6",
    active_outline: "white",
    streak_win: "#398FD6",
    streak_loss: "#EB5757"
  },
  {
    round: "3rd Round",
    text: "M83.5533 27.89C84.4733 27.89 84.7633 28.16 84.7633 28.65C84.7633 29.16 84.4733 29.48 83.9633 29.48C83.4933 29.48 83.2133 29.24 83.1033 28.79H81.1933C81.2733 30.58 82.7833 31.14 83.9133 31.14C85.3533 31.14 86.6533 30.14 86.6533 28.82C86.6533 27.97 86.1833 27.35 85.2633 27.03C85.8933 26.7 86.2433 26.21 86.2433 25.48C86.2433 24.27 85.2033 23.46 83.9233 23.46C82.4533 23.46 81.3933 24.38 81.3933 25.76H83.2533C83.2633 25.32 83.4633 25.12 83.8233 25.12C84.1533 25.12 84.3533 25.38 84.3533 25.77C84.3533 26.26 84.1033 26.51 83.2333 26.51H83.1033V27.89H83.5533ZM93.4149 31L91.4049 28.48C92.5449 28.28 93.2449 27.32 93.2449 26.15C93.2449 25.1 92.6849 24.23 91.8849 23.87C91.4949 23.7 90.9049 23.6 90.1349 23.6H87.7149V31H89.5249V28.61H89.5449L91.2549 31H93.4149ZM89.5249 27.32V25.26H90.2449C90.9549 25.26 91.4349 25.62 91.4349 26.26C91.4349 26.97 90.9749 27.32 90.2249 27.32H89.5249ZM96.7981 31C99.1081 31 100.548 29.74 100.548 27.3C100.548 25.79 99.8881 24.65 98.8381 24.05C98.3181 23.76 97.5881 23.6 96.6681 23.6H94.1481V31H96.7981ZM96.0381 29.34V25.26H96.8981C97.9881 25.26 98.6581 25.99 98.6581 27.31C98.6581 28.66 97.9781 29.34 96.8881 29.34H96.0381Z",
    path: "M78.901 54.0295C92.9662 39.9643 112.043 32.0625 131.934 32.0625V48.24C116.333 48.24 101.372 54.4374 90.3402 65.4687L78.901 54.0295Z",
    active: false,
    complete: false,
    winner: false,
    inactive_outline: "#398FD6",
    active_outline: "white",
    streak_win: "#398FD6",
    streak_loss: "#EB5757"
  },
  { 
    round: "4th Round", 
    text: "M169.22 31V29.7H170.04V28.22H169.22V23.6H167.46L164.15 28.32V29.7H167.41V31H169.22ZM167.53 28.22H166.05L167.51 25.9H167.53V28.22ZM173.632 31V25.26H175.082V23.6H170.282V25.26H171.742V31H173.632ZM182.042 31V23.6H180.152V26.38H177.732V23.6H175.842V31H177.732V28.04H180.152V31H182.042Z",
    path: "M132.066 32.0625C151.958 32.0625 171.034 39.9643 185.099 54.0295L173.66 65.4687C162.629 54.4374 147.667 48.24 132.066 48.24V32.0625Z",
    active: false,
    complete: false,
    winner: false,
    inactive_outline: "#398FD6",
    active_outline: "white",
    streak_win: "#398FD6",
    streak_loss: "#EB5757" 
  },
  { 
    round: "5th Round", 
    text: "M215.25 73.19V71.6H211.16L210.52 75.79L212.05 76.17C212.24 75.74 212.55 75.53 213.02 75.53C213.58 75.53 214.03 75.93 214.03 76.5C214.03 77.05 213.57 77.48 213.03 77.48C212.67 77.48 212.36 77.31 212.16 77.02H210.26C210.52 78.35 211.65 79.15 213.08 79.15C214.84 79.15 215.92 77.85 215.92 76.47C215.92 75.22 215.02 73.98 213.47 73.98C213.1 73.98 212.78 74.02 212.45 74.2L212.61 73.19H215.25ZM219.632 79V73.26H221.082V71.6H216.282V73.26H217.742V79H219.632ZM228.042 79V71.6H226.152V74.38H223.732V71.6H221.842V79H223.732V76.04H226.152V79H228.042Z",
    path: "M185.099 54.0998C199.164 68.165 207.066 87.2416 207.066 107.133L190.888 107.133C190.888 91.5321 184.691 76.5704 173.66 65.539L185.099 54.0998Z",
    active: false,
    complete: false,
    winner: false,
    inactive_outline: "#398FD6",
    active_outline: "white",
    streak_win: "#398FD6",
    streak_loss: "#EB5757" 
  },
  {
    round: "The Final",
    text: "M221.544 133.062V127.322H222.994V125.662H218.194V127.322H219.654V133.062H221.544ZM229.954 133.062V125.662H228.064V128.442H225.644V125.662H223.754V133.062H225.644V130.102H228.064V133.062H229.954ZM235.403 133.062V131.402H233.103V130.132H235.333V128.472H233.103V127.322H235.403V125.662H231.293V133.062H235.403ZM215.315 145.062V142.242H217.465V140.582H215.315V139.322H217.545V137.662H213.505V145.062H215.315ZM220.454 145.062V137.662H218.564V145.062H220.454ZM228.036 145.062V137.662H226.226L226.306 142.342L223.426 137.662H221.796V145.062H223.606L223.556 140.542L226.396 145.062H228.036ZM236.204 145.062L233.264 137.662H231.774L228.804 145.062H230.834L231.224 143.992H233.794L234.154 145.062H236.204ZM233.294 142.493H231.744L232.504 139.962L232.534 139.972L233.294 142.493ZM241.092 145.062V143.402H238.902V137.662H237.012V145.062H241.092Z",
    path: "M207.067 107.131C207.067 116.98 205.127 126.733 201.358 135.832C198.623 142.435 194.964 148.6 190.501 154.147C187.7 157.628 182.539 157.603 179.38 154.444V154.444C176.222 151.286 176.274 146.193 178.97 142.631C181.987 138.644 184.49 134.281 186.412 129.641C189.368 122.505 190.89 114.856 190.89 107.131L207.067 107.131Z",
    active: false,
    complete: false,
    winner: false,
    inactive_outline: "#398FD6",
    active_outline: "white",
    streak_win: "#398FD6",
    streak_loss: "#EB5757"
  }
]

const store = require('store');

export const DashboardContext = createContext({})

function SvgWidget({userId, round, height, width}) {
  const [state, setState] = useState({loading: true, paths: paths})
  let authToken = store.get('auth_token')
  const apiUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 2500,
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  })
  useEffect(() => {
    apiUrl.get(`v1/users/${userId}/cards`).then((response) => {
      const played_cards = response.data.cards
      setState({...state, loading: false, played_cards: played_cards})
    })
  }, [])

  if (state.loading) {
    return <></>
  }
  
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 266 214" fill="none" xmlns="http://www.w3.org/2000/svg" style={{margin: "0 auto"}}>
        
        {/* Basketball */}
        <ellipse cx="132.298" cy="107.2" rx="43.2983" ry="43.2" fill="#DD6937"/>
        <path d="M112.3 67.7C112.2 67.7 112.2 67.8 112.2 67.8C97.8 75 88 89.9 88 107C88 115.8 90.6 124 95.1 130.9C95.2 131 95.2 131.1 95.3 131.3C95.3 131.4 95.4 131.4 95.4 131.4C100.7 139.4 108.6 145.5 117.9 148.7C118 148.8 118.1 148.8 118.2 148.8C122.6 150.2 127.2 151 132 151C139 151 145.7 149.3 151.6 146.4C151.6 146.4 151.7 146.4 151.7 146.3C151.9 146.2 152 146.1 152.2 146C165.3 139.2 174.5 126.1 175.8 110.7C175.8 110.6 175.8 110.6 175.8 110.5C175.8 110.4 175.8 110.4 175.8 110.3C175.9 109.2 175.9 108.1 175.9 106.9C175.9 98 173.2 89.7 168.7 82.8C168.7 82.8 168.7 82.7 168.6 82.7L168.5 82.6C164.1 76.1 158.1 70.8 151 67.3C151 67.3 150.9 67.3 150.9 67.2C145.1 64.4 138.7 62.9 131.9 62.9C124.9 62.9 118.3 64.5 112.5 67.4C112.5 67.6 112.4 67.6 112.3 67.7ZM113.9 70.2C120.1 67.3 127.7 68.1 135.4 72.6C137.8 74 140.2 75.7 142.4 77.7C136.9 79.5 132.7 79.7 127.4 80C123.6 80.2 119.3 80.4 113.8 81.2C105.8 82.4 99.7 85.8 94.8 89.6C98.8 81.2 105.6 74.3 113.9 70.2ZM92.7 95.3C98 90.6 104.8 85.6 114.4 84.1C119.7 83.3 123.9 83.1 127.6 82.9C133.3 82.6 138.3 82.4 144.9 79.9C146.7 81.7 148.4 83.7 150 85.9C141.9 89.7 132.9 95.1 126.8 99.1C117.3 105.4 108.7 112 102.8 117.7C99 121.4 96.9 124.1 95.8 126C92.7 120.5 91 113.9 91 107C91 102.9 91.6 99 92.7 95.3ZM97.8 129.5C97 127.4 107 115.9 128.5 101.7C137.7 95.6 145.6 91.3 151.8 88.5C153.2 90.6 154.5 92.8 155.7 95.2C155.8 95.5 155.9 95.7 156.1 96C151.1 99 148.8 104.4 146 111.1C145.4 112.5 144.8 114 144.1 115.5L143.7 116.3C139.8 125.2 132.4 141.6 118.7 145.8C110 142.8 102.7 137 97.8 129.5ZM166.2 84.4C169.3 89.1 171.5 94.4 172.4 100.2C171.2 98.4 169.8 96.7 168.1 95.6C165.3 93.8 162.1 93.5 158.7 94.7C158.6 94.4 158.4 94.1 158.3 93.9C157.2 91.6 155.9 89.4 154.5 87.4C161.2 84.4 165.4 83.6 166.2 84.4ZM162.2 134.7C163.4 131.9 164.2 128.7 164.7 125.1C164.9 123.4 165 121.7 165 119.9C165 112.6 163.3 104.8 160 97.2C162.4 96.4 164.5 96.6 166.5 97.9C170.8 100.7 172.9 107.7 172.9 110.2C172.1 119.7 168.2 128.2 162.2 134.7ZM123.4 147.1C135.9 141 142.6 125.9 146.4 117.5L146.8 116.7C147.5 115.1 148.1 113.6 148.7 112.2C151.3 106 153.3 101.3 157.3 98.7C161.1 107.5 162.6 116.7 161.7 124.9C160.7 133.7 156.8 140.3 150.9 143.5C145.2 146.3 138.8 148 132 148C129 148 126.1 147.7 123.4 147.1ZM163.9 81.3C161 81.6 157.1 82.9 152.8 84.7C151.2 82.5 149.5 80.5 147.8 78.7C150.6 77.1 152.5 75 153 72.6C153.1 72.3 153.1 72.1 153.1 71.8C157.2 74.3 160.9 77.6 163.9 81.3ZM149.6 70C150.1 70.5 150.2 71.3 150.1 72C149.8 73.7 148.1 75.3 145.6 76.4C142.9 73.9 140 71.7 137 69.9C133.9 68.1 130.8 66.9 127.8 66.1C129.2 66 130.6 65.9 132.1 65.9C138.3 66 144.2 67.4 149.6 70Z" fill="#111E4B"/>
        <path d="M100.463 177V168.12H97.5351L95.7951 173.964H95.7711L94.0071 168.12H91.0911V177H93.1791L93.1071 170.268L95.0271 177H96.5271L98.4231 170.328L98.4471 170.352L98.3751 177H100.463ZM106.296 177V173.772L108.924 168.12H106.488L105.156 171.684L103.836 168.12H101.376L104.028 173.772V177H106.296ZM115.716 177V174.216H116.772C119.316 174.216 120.228 172.764 120.228 171.12C120.228 169.92 119.628 168.9 118.668 168.456C118.2 168.24 117.492 168.108 116.544 168.12H113.544V177H115.716ZM115.716 172.224V170.112H116.604C117.612 170.112 118.056 170.436 118.056 171.156C118.056 171.912 117.6 172.224 116.688 172.224H115.716ZM128.013 177L125.601 173.976C126.969 173.736 127.809 172.584 127.809 171.18C127.809 169.92 127.137 168.876 126.177 168.444C125.709 168.24 125.001 168.12 124.077 168.12H121.173V177H123.345V174.132H123.369L125.421 177H128.013ZM123.345 172.584V170.112H124.209C125.061 170.112 125.637 170.544 125.637 171.312C125.637 172.164 125.085 172.584 124.185 172.584H123.345ZM133.534 177.168C136.078 177.168 138.118 175.128 138.118 172.5C138.118 169.956 136.018 167.952 133.426 167.952C130.726 167.952 128.746 170.016 128.746 172.764C128.746 175.392 131.062 177.168 133.534 177.168ZM133.462 175.176C132.01 175.176 131.014 174 131.014 172.536C131.014 171.132 132.01 169.944 133.426 169.944C134.854 169.944 135.85 171.18 135.85 172.572C135.85 173.988 134.866 175.176 133.462 175.176ZM148.409 171.948H143.129V173.76H145.781C145.505 174.672 144.713 175.188 143.657 175.188C142.157 175.188 141.221 174 141.221 172.524C141.221 171.096 142.217 169.944 143.645 169.944C144.497 169.944 145.181 170.364 145.601 171.096H148.145C147.641 169.308 145.709 167.952 143.705 167.952C141.125 167.952 138.953 169.836 138.953 172.524C138.953 175.128 141.041 177.18 143.669 177.18C146.657 177.18 148.409 174.84 148.409 172.452V171.948ZM156.419 177L154.007 173.976C155.375 173.736 156.215 172.584 156.215 171.18C156.215 169.92 155.543 168.876 154.583 168.444C154.115 168.24 153.407 168.12 152.483 168.12H149.579V177H151.751V174.132H151.775L153.827 177H156.419ZM151.751 172.584V170.112H152.615C153.467 170.112 154.043 170.544 154.043 171.312C154.043 172.164 153.491 172.584 152.591 172.584H151.751ZM162.351 177V175.008H159.591V173.484H162.267V171.492H159.591V170.112H162.351V168.12H157.419V177H162.351ZM169.483 170.712C169.471 169.524 169.015 168.816 168.067 168.324C167.599 168.084 167.083 167.952 166.495 167.952C164.863 167.952 163.399 169.056 163.399 170.568C163.399 171.72 164.059 172.488 165.511 173.076C166.315 173.4 167.299 173.712 167.299 174.42C167.299 174.9 166.915 175.272 166.447 175.272C165.883 175.272 165.523 174.792 165.511 174.06H163.255V174.252C163.255 176.16 164.527 177.168 166.459 177.168C168.379 177.168 169.555 176.16 169.555 174.444C169.555 173.28 169.063 172.572 167.107 171.732C166.135 171.312 165.655 171.072 165.655 170.544C165.655 170.148 166.015 169.848 166.435 169.848C166.879 169.848 167.143 170.076 167.239 170.712H169.483ZM176.362 170.712C176.35 169.524 175.894 168.816 174.946 168.324C174.478 168.084 173.962 167.952 173.374 167.952C171.742 167.952 170.278 169.056 170.278 170.568C170.278 171.72 170.938 172.488 172.39 173.076C173.194 173.4 174.178 173.712 174.178 174.42C174.178 174.9 173.794 175.272 173.326 175.272C172.762 175.272 172.402 174.792 172.39 174.06H170.134V174.252C170.134 176.16 171.406 177.168 173.338 177.168C175.258 177.168 176.434 176.16 176.434 174.444C176.434 173.28 175.942 172.572 173.986 171.732C173.014 171.312 172.534 171.072 172.534 170.544C172.534 170.148 172.894 169.848 173.314 169.848C173.758 169.848 174.022 170.076 174.118 170.712H176.362Z" fill="white"/>
        { state.paths.map((svg, index) => {
          return (
            <Fragment key={index}>
             <path d={svg.text} fill="white"/>
             <path d={svg.path} stroke={state.played_cards[index]?.round.status === "pending" ? svg.active_outline : svg.inactive_outline} strokeLinejoin="round" fill={state.played_cards[index]?.round.status === "complete" ? state.played_cards[index].status !== "pending" && state.played_cards[index].status === "win" ? "#398FD6" : "#EB5757" : null }/> 
            </Fragment>
          )
        })}
       
        {/* <g filter="url(#filter0_d)">
          <path d="M84.6208 154.379C81.4619 157.538 76.3012 157.562 73.5007 154.082C69.0376 148.535 65.3783 142.37 62.6432 135.767C58.8741 126.667 56.9342 116.914 56.9342 107.065H73.1117C73.1117 114.79 74.6332 122.439 77.5893 129.576C79.5109 134.215 82.0143 138.578 85.0314 142.565C87.7274 146.127 87.7796 151.22 84.6208 154.379V154.379Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
        </g>
        <defs>
          <filter id="filter0_d" x="51.9341" y="102.066" width="40.0893" height="59.6555" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
        </defs> */}
        

      </svg>
    </>
  );
}

export default SvgWidget;