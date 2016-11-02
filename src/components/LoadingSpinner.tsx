import * as React from "react";
import { CircularProgress } from "material-ui";

class LoadingSpinner extends React.Component<void, void> {
    public render() {
        return (
            <div className="loadingSpinner">
                <CircularProgress />
            </div>
        );
    }
}

export default LoadingSpinner;
