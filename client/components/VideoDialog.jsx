import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';


const Container = styled.div`
  height: 100vh; 
  width:100%; 
  display: flex; 
  flex-direction: column;
  `;

  const row = styled.div`
  dis