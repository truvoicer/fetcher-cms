import { isAuthenticated } from "../library/session/authenticate";
import Router from 'next/router'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.loggedIn = false;
  }

  componentDidMount() {
      console.log(isAuthenticated())
      if (!isAuthenticated()) {
          Router.push("/auth/login");
      } else {
          Router.push('/admin/dashboard')
      }
  }

  render() {
      return (
        <h1>Home</h1>
      )
  
  }
}
