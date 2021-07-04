import { AuthManager } from '../auth/AuthManager';
import { GraphManager } from '../graph/GraphManager'; 


try {
    const accessToken = await AuthManager.getAccessTokenAsync();
  
    // TEMPORARY
    this.setState({userFirstName: accessToken, userLoading: false});
  } catch (error) {
    Alert.alert(
      'Error getting token',
      JSON.stringify(error),
      [
        {
          text: 'OK'
        }
      ],
      { cancelable: false }
    );
  }

  async componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: false,
    });
  
    try {
      // Get the signed-in user from Graph
      const user: MicrosoftGraph.User = await GraphManager.getUserAsync();
  
      // Update UI with display name and email
      this.setState({
        userLoading: false,
        userFirstName: user.givenName!,
        userFullName: user.displayName!,
        // Work/School accounts have email address in mail attribute
        // Personal accounts have it in userPrincipalName
        userEmail: user.mail! || user.userPrincipalName!,
        userTimeZone: user.mailboxSettings?.timeZone!
      });
    } catch(error) {
      Alert.alert(
        'Error getting user',
        JSON.stringify(error),
        [
          {
            text: 'OK'
          }
        ],
        { cancelable: false }
      );
    }
  }