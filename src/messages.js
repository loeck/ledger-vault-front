// @flow
export default {
  en: {
    error: {
      error5xTitle: "Oups! Something went wrong",
      error5xContent:
        "Sorry, it seems something went wrong with the server. Please retry."
    },
    common: {
      save: "Save",
      continue: "Continue",
      cancel: "Cancel"
    },
    actionBar: {
      viewProfile: "View profile",
      overview: "Overview",
      export: "Export",
      settings: "Settings",
      activity: "Activity",
      myProfile: "My profile",
      editProfile: "Edit profile",
      logOut: "Log out"
    },
    menu: {
      dashboard: "Dashboard",
      newOperation: "New operation",
      pendingRequests: "Pending",
      search: "Search"
    },
    profile: {
      title: "Edit profile",
      name: "Name",
      firstName: "First name",
      lastName: "Last name",
      mail: "E-mail",
      updateSuccess: {
        title: "Profile Updated",
        content: "Your profile has been successfully updated."
      },
      updateInvalid: {
        title: "Oops",
        content: "All fields must be correctly filled."
      },
      updateFailure: {
        title: "Oops",
        content: "Your profile could not be updated."
      }
    },
    accounts: {
      creationSuccessTitle: "Account request created",
      creationSuccessBody:
        "The opereation request has been successfully created.",
      abortSuccessTitle: "Request deleted",
      abortSuccessBody: "The account request has been successfully deleted.",
      approveSuccessTitle: "Account approved",
      approveSuccessBody: "The account have been successfully approved."
    },
    operations: {
      detailsTitle: "Operation's details",
      overview: "Overview",
      details: "Details",
      label: "Label",
      abortSuccessTitle: "Request deleted",
      abortSuccessBody: "The operation request has been successfully deleted.",
      approveSuccessTitle: "Operation approved",
      approveSuccessBody: "The operation have been successfully approved."
    },
    role: {
      administrator: "Administrator"
    },
    login: {
      help: "Assistance",
      instructions: "Enter your team domain to sign in.",
      hint: "Your team domain",
      signIn: "Sign in to %{team}",
      stepOne:
        "Connect your Ledger Blue to your computer using one of its USB port.",
      stepTwo:
        "Make sure your device is powered on, and unlock it by entering your PIN.",
      stepThree:
        "Open the Vault app and confirm the authentication request when displayed.",
      awaitingDevice: "Awaiting device...",
      logoutTitle: "See you soon!",
      logoutMessage:
        "You have been successfully logged out. You can now safely close your web browser.",
      sessionClosedTitle: "Session expired",
      sessionClosedMessage:
        "Your session has expired. Please login to access the platform anew.",
      wrongDomainTitle: "Unknown team domain",
      wrongDomainMessage:
        "This team domain is unknown. Contact your administrator to get more information.",
      welcomeTitle: "Welcome",
      welcomeMessage: "Hello Welcome on Ledger Vault Application",
      apiErrorTitle: "Wrong challenge",
      apiErrorMessage:
        "It seens the challenge signed by the device is not correct. Please Retry.",
      timeoutTitle: "Timeout Error",
      timeoutMessage:
        "You did not accept the authorization on your device. Please retry. "
    }
  },
  fr: {
    error: {
      error5xTitle: "Oups! Something went wrong",
      error5xContent:
        "Sorry, it seems something went wrong with the server. Please retry."
    },
    common: {
      save: "Enregistrer",
      cancel: "Annuler",
      continue: "Continue"
    },
    actionBar: {
      viewProfile: "Voir le profil",
      overview: "Vue d'ensemble",
      export: "Exporter",
      settings: "Préférences",
      activity: "Activité",
      myProfile: "Mon profil",
      editProfile: "Editer le profil",
      logOut: "Déconnexion"
    },
    menu: {
      dashboard: "Tableau de bord",
      newOperation: "Nouvelle operation",
      pendingRequests: "Requêtes en attente",
      search: "Recherche"
    },
    profile: {
      title: "Edit profile",
      name: "Nom",
      firstName: "First name",
      lastName: "Last name",
      mail: "E-mail",
      updateSuccess: {
        title: "Profil mis à jour",
        content: "Votre profil a bien été mis à jour."
      },
      updateInvalid: {
        title: "Oops",
        content: "Tous les champs doivent être correctement renseignés."
      },
      updateFailure: {
        title: "Oops",
        content: "Votre profil n'a pas pu être mis à jour."
      }
    },
    operations: {
      detailsTitle: "Operation's details",
      overview: "Overview",
      details: "Details",
      label: "Label"
    },
    role: {
      administrator: "Administrateur"
    },
    login: {
      help: "Assistance",
      instructions: "Nom de domaine de votre équipe.",
      hint: "Your team domain",
      wrongDomainTitle: "Unknown team domain",
      wrongDomainMessage:
        "This team domain is unknown. Contact your administrator to get more information."
    }
  }
};
