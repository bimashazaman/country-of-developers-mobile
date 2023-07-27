/* eslint-disable react-native/no-inline-styles */
import {View, Text, ActivityIndicator, ScrollView, Image} from 'react-native';
import {BASE_URL, WEB_URL} from '../../utils/constant';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getTimeDifference} from '../../utils/helper';

const LikeScreen = ({route}) => {
  const {accessToken} = route.params;
  const {postId} = route.params;

  const [likesData, setLikesData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/likes/whoLiked/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setLikesData(data);
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [accessToken, postId]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#121724', padding: 20}}>
      <ScrollView>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#3ABEFE',
            paddingBottom: 10,
          }}>
          <Text
            style={{
              color: '#3ABEFE',
              marginLeft: 150,
              fontSize: 26,
              fontFamily: 'RussoOne-Regular',
            }}>
            Likes
          </Text>
        </View>
        {likesData &&
          likesData.data.map((like, index) => (
            <View
              key={index}
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                {like.user.avatar == null ? (
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/profile.jpg')}
                      style={{width: 40, height: 40, borderRadius: 20}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity>
                    <Image
                      source={{uri: `${WEB_URL}/avatars/${like.user.avatar}`}}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#fff',
                      }}
                    />
                  </TouchableOpacity>
                )}
                <Text style={{color: '#fff', marginLeft: 10, marginTop: 10}}>
                  {like.user.name}
                </Text>
              </View>
              {/* created at */}
              <Text style={{color: '#fff', marginLeft: 10, marginTop: 10}}>
                {getTimeDifference(new Date(), new Date(like.created_at))}
              </Text>
            </View>
          ))}

        {likesData && likesData.data.length === 0 && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              No likes yet
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LikeScreen;
