import AllFriendsNumbers from '../Friends/AllFriendsRequest/AllFriendsNumbers';
import AllMessages from '../Chat/AllMessages';
import ChangeEmailScreen from '../Settings/ChangeEmail';
import ChangeMobileScreen from '../Settings/ChangeMobile';
import ChangePasswordandSecurityScreen from '../Settings/ChangePasswordandSecurity';
import CommentScreen from '../Comment/CommentScreen';
import EditProfileScreen from '../Profile/EditProfile';
import EmailandMobileScreen from '../Settings/EmailandMobile';
import EmailOTPScreen from '../Settings/EmailOtp';
import ForgetPasswordScreen from '../Auth/ForgetPasswordScreen';
import LoginScreen from '../Auth/LoginScreen';
import MobileOTPScreen from '../Settings/MobileOTP';
import NotificationHeader from '../Notification/NotificationHeader';
import NotificationScreen from '../Notification/NotificationScreen';
import Notifications from '../Notification/Notifications';
import RegisterScreen from '../Auth/RegisterScreen';
import ResetPasswordScreen from '../Auth/ResetPasswordScreen';
import ViewFriendProfile from '../Profile/ViewFriendProfile';
import CreatePost from '../CreatePost/CreatePost';
import SearchScreen from '../search/SearchScreen';
import UserProfileScreen from '../User/UserProfileScreen';
import CurrentChat from '../Chat/CurrentChat';
import FriendsScreen from '../Friends/FriendsScreen';
import AppTabNavigator from '../../navigate/AppTabNavigator';
import CommentHeader from '../../component/Comments/CommentHeader';
import Comments from '../../component/Comments/Comments';
import PageScreen from '../Pages/PageScreen';
import PageProfileScreen from '../PageProfile/PageProfileScreen';
import CreatePageScreen from '../CreatePage/CreatePageScreen';
import EditPage from '../Pages/EditPage';
import CreatePostProfile from '../PageProfile/CreatePostProfile';
import ProfileScreen from '../Profile/ProfileScreen';
import SettingsScreen from '../Settings/SettingsScreen';
import LikeScreen from '../Like/LikeScreen';
import ChatScreen from '../Chat/ChatsScreen';

const appScreens = {
  Home: {component: AppTabNavigator, options: {title: 'Home'}},

  ChangePasswordandSecurityScreen: {
    component: ChangePasswordandSecurityScreen,
    options: {title: 'ChangePasswordandSecurity'},
  },
  EditProfileScreen: {
    component: EditProfileScreen,
    options: {title: 'EditProfile'},
  },
  ChangeEmail: {component: ChangeEmailScreen, options: {title: 'ChangeEmail'}},
  ChangeMobile: {
    component: ChangeMobileScreen,
    options: {title: 'ChangeMobile'},
  },
  EmailOTP: {component: EmailOTPScreen, options: {title: 'EmailOTP'}},
  MobileOTP: {component: MobileOTPScreen, options: {title: 'MobileOTP'}},
  ViewFriendProfile: {
    component: ViewFriendProfile,
    options: {title: 'ViewFriendProfile'},
  },
  Notifications: {
    component: Notifications,
    options: {title: 'Notifications'},
  },
  NotificationHeader: {
    component: NotificationHeader,
    options: {title: 'NotificationHeader'},
  },
  AllMessages: {component: AllMessages, options: {title: 'AllMessages'}},
  AllFriendsNumbers: {
    component: AllFriendsNumbers,
    options: {title: 'AllFriendsNumbers'},
  },
  NotificationScreen: {
    component: NotificationScreen,
    options: {title: 'NotificationScreen'},
  },
  CommentScreen: {component: CommentScreen, options: {title: 'CommentScreen'}},
  CommentHeader: {component: CommentHeader, options: {title: 'CommentHeader'}},
  Comments: {component: Comments, options: {title: 'Comments'}},
  CreatePosts: {component: CreatePost, options: {title: 'CreatePosts'}},
  SearchScreen: {component: SearchScreen, options: {title: 'SearchScreen'}},
  UserProfileScreen: {
    component: UserProfileScreen,
    options: {title: 'UserProfileScreen'},
  },
  Friends: {component: FriendsScreen, options: {title: 'FriendsScreen'}},
  CurrentChat: {component: CurrentChat, options: {title: 'CurrentChat'}},
  PageScreen: {component: PageScreen, options: {title: 'PageScreen'}},
  PageProfileScreen: {
    component: PageProfileScreen,
    options: {title: 'PageProfileScreen'},
  },
  CreatePageScreen: {
    component: CreatePageScreen,
    options: {title: 'CreatePageScreen'},
  },
  Login: {component: LoginScreen, options: {title: 'Login'}},
  Register: {component: RegisterScreen, options: {title: 'Register'}},
  ForgetPassword: {
    component: ForgetPasswordScreen,
    options: {title: 'ForgetPassword'},
  },
  ResetPassword: {
    component: ResetPasswordScreen,
    options: {title: 'ResetPassword'},
  },
  EditPage: {component: EditPage, options: {title: 'EditPage'}},
  CreatePostProfile: {
    component: CreatePostProfile,
    options: {title: 'CreatePostProfile'},
  },
  EmailandMobileScreen: {
    component: EmailandMobileScreen,
    options: {title: 'EmailandMobileScreen'},
  },
  Profile: {component: ProfileScreen, options: {title: 'Profile'}},
  Settings: {component: SettingsScreen, options: {title: 'Settings'}},
  //LikeScreen
  LikeScreen: {component: LikeScreen, options: {title: 'LikeScreen'}},
  ChatScreen: {component: ChatScreen, options: {title: 'ChatScreen'}},
};

const authScreens = {
  Login: {component: LoginScreen, options: {title: 'Login'}},
  Register: {component: RegisterScreen, options: {title: 'Register'}},
  ForgetPassword: {
    component: ForgetPasswordScreen,
    options: {title: 'ForgetPassword'},
  },
  ResetPassword: {
    component: ResetPasswordScreen,
    options: {title: 'ResetPassword'},
  },
  Home: {component: AppTabNavigator, options: {title: 'Home'}},

  ChangePasswordandSecurityScreen: {
    component: ChangePasswordandSecurityScreen,
    options: {title: 'ChangePasswordandSecurity'},
  },
  EditProfileScreen: {
    component: EditProfileScreen,
    options: {title: 'EditProfile'},
  },
  ChangeEmail: {component: ChangeEmailScreen, options: {title: 'ChangeEmail'}},
  ChangeMobile: {
    component: ChangeMobileScreen,
    options: {title: 'ChangeMobile'},
  },
  EmailOTP: {component: EmailOTPScreen, options: {title: 'EmailOTP'}},
  MobileOTP: {component: MobileOTPScreen, options: {title: 'MobileOTP'}},
  ViewFriendProfile: {
    component: ViewFriendProfile,
    options: {title: 'ViewFriendProfile'},
  },
  Notifications: {
    component: Notifications,
    options: {title: 'Notifications'},
  },
  NotificationHeader: {
    component: NotificationHeader,
    options: {title: 'NotificationHeader'},
  },
  AllMessages: {component: AllMessages, options: {title: 'AllMessages'}},
  AllFriendsNumbers: {
    component: AllFriendsNumbers,
    options: {title: 'AllFriendsNumbers'},
  },
  NotificationScreen: {
    component: NotificationScreen,
    options: {title: 'NotificationScreen'},
  },
  CommentScreen: {component: CommentScreen, options: {title: 'CommentScreen'}},
  CommentHeader: {component: CommentHeader, options: {title: 'CommentHeader'}},
  Comments: {component: Comments, options: {title: 'Comments'}},
  CreatePosts: {component: CreatePost, options: {title: 'CreatePosts'}},
  SearchUsers: {component: SearchScreen, options: {title: 'SearchUsers'}},
  UserProfileScreen: {
    component: UserProfileScreen,
    options: {title: 'UserProfileScreen'},
  },
  Friends: {component: FriendsScreen, options: {title: 'FriendsScreen'}},
  CurrentChat: {component: CurrentChat, options: {title: 'CurrentChat'}},
  PageScreen: {component: PageScreen, options: {title: 'PageScreen'}},
  PageProfileScreen: {
    component: PageProfileScreen,
    options: {title: 'PageProfileScreen'},
  },
  CreatePageScreen: {
    component: CreatePageScreen,
    options: {title: 'CreatePageScreen'},
  },

  EditPage: {component: EditPage, options: {title: 'EditPage'}},
  CreatePostProfile: {
    component: CreatePostProfile,
    options: {title: 'CreatePostProfile'},
  },
  EmailandMobileScreen: {
    component: EmailandMobileScreen,
    options: {title: 'EmailandMobileScreen'},
  },
  Profile: {component: ProfileScreen, options: {title: 'Profile'}},
  Settings: {component: SettingsScreen, options: {title: 'Settings'}},
  LikeScreen: {component: LikeScreen, options: {title: 'LikeScreen'}},
  ChatScreen: {component: ChatScreen, options: {title: 'ChatScreen'}},
  //search Screen
  SearchScreen: {component: SearchScreen, options: {title: 'SearchScreen'}},
};

export {appScreens, authScreens};
