import {SiteConfig} from "../../../config/site-config";

class AdminFooter extends React.Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {
  }


  render() {
    return (
        <footer className="c-footer">
          <div>{SiteConfig.siteName} © 2020</div>
        </footer>
    )
  }
}
export default AdminFooter