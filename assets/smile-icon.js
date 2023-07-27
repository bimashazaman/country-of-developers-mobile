import React from 'react';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

export function SmileIcon() {
  return (
    <Svg fillRule="evenodd" clipRule="evenodd" viewBox="0 0 1289 1289">
      <Defs>
        <LinearGradient
          id="id0"
          gradientUnits="userSpaceOnUse"
          x1="322.37"
          y1="322.37"
          x2="967.12"
          y2="967.12">
          <Stop offset="0" stop-opacity="1" stop-color="#FFC629" />
          <Stop offset="1" stop-opacity="1" stop-color="#584501" />
        </LinearGradient>
      </Defs>
      <G id="Layer_x0020_1">
        <G id="_366359744">
          <Circle fill="url(#id0)" cx="645" cy="645" r="645" />
          <G>
            <Ellipse fill="#1A2235" cx="454" cy="508" rx="65" ry="85" />
            <Ellipse fill="#1A2235" cx="836" cy="508" rx="65" ry="85" />
          </G>
          <Path
            fill="#1A2235"
            d="M360 949c40,-37 270,-239 542,-89 8,5 16,9 24,14 0,0 -9,-2 -24,-6 -72,-15 -298,-48 -540,83 -8,5 -10,6 -2,-2z"
          />
        </G>
      </G>
    </Svg>
  );
}
