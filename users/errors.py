class InvalidFacebookTokenError(Exception):
    pass


class UserAlreadyExistsError(Exception):
    message = "Looks like we already have an account with for that email. If that’s you, click here to sign in to your account."
