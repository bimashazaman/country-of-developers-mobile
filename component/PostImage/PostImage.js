// import React, {useState} from 'react';
// import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
// import {ImageGrid} from 'react-fb-image-video-grid';

// const PostImage = () => {
//   const [Img, setImg] = useState([
//     {
//       image: require('../../../assets/profile.jpg'),
//     },

//     {
//       image: require('../../../assets/profile.jpg'),
//     },
//     {
//       image: require('../../../assets/profile.jpg'),
//     },
//   ]);
//   return (
//     <View>
//       {Img.map(Image => (
//         <ImageGrid>
//           <Image source={Img.image} />
//         </ImageGrid>
//       ))}
//     </View>
//   );
// };

// export default PostImage;

import {View, Text} from 'react-native';
import React from 'react';

const PostImage = () => {
  return (
    <View>
      <Text>PostImage</Text>
    </View>
  );
};

export default PostImage;
