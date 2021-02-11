import * as React from 'react'
import {setToLocalStorage, getFromLocalStorage} from '../../utils/'
const {REACT_APP_APY_KEY, REACT_APP_APP_NAME, REACT_APP_REDIRECT_URL, REACT_APP_SCOPE} = process.env
const TOKEN_STORAGE_KEY = 'TOKEN'

interface Board {
    id: string;
    name: string;
    pinned: boolean;
    desc?: string;
}

interface AppState {
    token: string
    boards: Array<Board>
}

export class App extends React.Component<any, AppState> {
    public state = {
        token: '',
        boards: [],
    }

    private async setToken(token: string) {
        this.setState({token})
        await setToLocalStorage(TOKEN_STORAGE_KEY, token)
    }

    private async getToken() {
        const token = await getFromLocalStorage(TOKEN_STORAGE_KEY)
        return token
    }

    private getTokenFromUrl() {
        return window.location.hash.split('=')[1]
    }

    private isLoggedIn() {
        return !!this.state.token
    }

    private renderHeader() {
        
        
        const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_APY_KEY}`
        return <header>
                    
                    {this.isLoggedIn() ? 'Hello User' : <a href={requestUrl}>Log in</a>}
                </header>
    }

    private renderContent() {
        return <main>
            {this.isLoggedIn() ? <h1>Congrat</h1> : 'please Log in'}
        </main>
        
    }

    public componentDidMount() {
        const newToken = this.getTokenFromUrl();
        this.setToken(newToken);
    }


    public render() { 
        return(
            <div className="page">
                {this.renderHeader()}
                {this.renderContent()}   
            </div>
        )
    }
}