import App, {Container } from 'next/app';
import { ApolloProvider}  from 'react-apollo';
import withData from '../lib/withData';
import Page from '../components/Page';

class MyApp extends App {
     static async getInitalProps({Component,ctx}){
        let pageProps = {};
        if(Component.getInitalProps){
            pageProps = await Component.getInitalProps(ctx);
        }
        //this expose the query to the user
        pageProps.qury = ctx.qury;
        return {pageProps };
    }
    render(){
        const {Component,apollo, pageProps } = this.props;
        
        return(
            <Container>
            <ApolloProvider client={apollo}>
              <Page>
                <Component { ...pageProps}/>
             </Page>
             </ApolloProvider>             
            </Container>
        );
    }

}

export default withData(MyApp);