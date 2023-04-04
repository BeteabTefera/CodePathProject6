import BrewDetail from "../Components/brewDetail";
import SideNav from "../Components/SideNav";
const DetailView = () => {
  return (
   <div>
        <BrewDetail />
        <SideNav latitude={45.134} longitude={-93.3495}/>

   </div>
  );
};

export default DetailView;