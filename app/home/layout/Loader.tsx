import { Fragment } from "react";
import { TailSpin } from "react-loader-spinner";
const Loader = () => {
  return (
    <Fragment>
      <div className="w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#000"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </Fragment>
  );
};
export default Loader;
