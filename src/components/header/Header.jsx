import "./header.css";
import { LightDarkIcon } from "./LightDarkIcon";
export function Header() {
  return (
    <header className="sm-header">
      <h3 className="sm-header-logo">
        <i className="fas fa-video"></i>
        <span>Coach To Transformation</span>
      </h3>
      <LightDarkIcon />
    </header>
  );
}
