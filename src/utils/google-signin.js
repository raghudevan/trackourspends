import { GoogleSignin } from 'react-native-google-signin';

// the configuration should prolly come from some sort of conf file esp. webClientId
export async function configureGoogleSignin() {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        webClientId: '649923802570-mnn6hbcb39371pogl4ci8rjalb4s550i.apps.googleusercontent.com',
        offlineAccess: false,
        forceConsentPrompt: false
    });
    return GoogleSignin.currentUserAsync();
}

export async function googleSignin() {
    return await GoogleSignin.signIn();
}

export async function googleSignout() {
    return await GoogleSignin.signOut();
}