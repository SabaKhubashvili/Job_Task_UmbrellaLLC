import React from "react";
import { Helmet } from "react-helmet-async";
import { Filter } from "../components/Filter/Filter";
import { Container } from "../components/Container";
import { Products } from "../components/Products/Products";
import { LinkButton } from "../components/buttons/LinkButton";
import { AdminTools } from "../components/admin/AdminTools";

interface Props {
  isAdmin?: boolean;
}


export const Home = ({ isAdmin }: Props) => {

  
  return (
    <React.Fragment>
      <Helmet>
        <title>{isAdmin ? 'Home | Admn' : 'Home'}</title>
        <meta property="og:title" content="Job Task from UmbrelaLLC" />
        <meta property="og:description" content="Here is project made by me" />
      </Helmet>
    
      <Container>
        <main className="w-full h-full pt-[40px]">
          <Filter/>
          <div className="mt-[20px]">

          <LinkButton
            to="/favorites"
            label="Favorites"
            />
            </div>
          {isAdmin &&
            <AdminTools/> 
          }
          <Products isAdmin={isAdmin} />
        </main>
      </Container>
      <div className="fixed right-5 bottom-[4rem] z-[99]">
        <LinkButton 
        to={isAdmin ? '/' : '/admin'} 
        label={isAdmin ? 'Become member' : 'Become admin' }/>
      </div>
    </React.Fragment>
  );
};
