import '../assets/scss/style.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import {Provider} from "react-redux";
import store from "../library/redux/store";

export default function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  )
}
