import {StyleSheet} from 'react-native';

export const CommentStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    minHeight: 100,
    backgroundColor: '#121724',
  },
  commentContainer: {
    backgroundColor: '#1A2235',
    flexDirection: 'row',
    margin: 15,
  },

  commentReplyContainer: {
    borderBottomWidth: 4,
    borderRadius: 10,
    backgroundColor: '#1A2235',
    margin: 10,
    padding: 15,
  },

  mainContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 4,
    borderRadius: 10,
    display: 'flex',
    backgroundColor: '#1A2235',
    margin: 15,
  },

  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#E1E4F0',
  },
  commentText: {
    fontSize: 16,
    color: '#E1E4F0',
  },
  profileImage: {
    width: 37,
    height: 37,
    borderRadius: 100,
    marginBottom: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },

  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#0A0E16',
    height: '9%',
    width: '100%',
  },
  inputWrapper: {
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 20,
    height: 35,
    width: '90%',
    borderRadius: 40,
    position: 'absolute',
    bottom: 4,
    color: '#556080',
    fontWeight: '800',
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    caretColor: 'green',
    padding: 6,
    marginLeft: 4,
    backgroundColor: '#0A0E16',
    color: '#fff',
  },
  actionText: {
    alignSelf: 'center',
    marginRight: 10,
    marginTop: 5,
  },
  replyContainer: {
    width: '100%',
    marginTop: 55,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  replyInput: {
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 20,
    height: 35,
    width: '90%',
    borderRadius: 40,
    position: 'absolute',
    bottom: 4,
    color: '#556080',
    fontWeight: '800',
    marginHorizontal: 20,
    flexDirection: 'row',
    marginTop: 10,
  },

  replyButton: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  replyText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  replyItemContainer: {
    backgroundColor: '#1A2235',
    flexDirection: 'row',
    margin: 10,
  },

  ReplyContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  replyFlex: {
    flexDirection: 'row',
  },
  profileImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
