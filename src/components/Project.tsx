import { ProjectProps } from "../types";

export function Project(props: ProjectProps) {
  return (
    <div className="project">
      <div className="project__wrapper">
        <div className="project__header">
          <h3>{props.type}</h3>
          <h2>{props.type}</h2>
        </div>
        <div className="project__content">
          {/* props.pucture will be the src to the image */}
          <div className="content__image"></div>
        </div>
      </div>
    </div>
  );
}
