import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Routes} from '../../../config/routes'

class Breadcrumbs extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props)
    this.getItems = this.getItems.bind(this);
  }

  componentDidMount() {
  }

  getItems() {
    // let items = [];
    // for (let i=0;i<Routes.items.length;i++){
    //   console.log(Routes.items[i])
    //   if (typeof Routes.items[i].subs !== "undefined") {
    //
    //   }
    // }
    return <div></div>
  }

  getSubItems(items) {
    for (let i=0;i<items.length;i++){
      if (typeof Routes.items[i].subs !== "undefined") {

      }
    }
  }

  render() {
    return (
        <div>
          <this.getItems/>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
        </div>
    )
  }
}
export default Breadcrumbs