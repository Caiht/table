import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ArticleSearchAll from "./ArticleSearchAll";
import ArticleSearchParams from "./ArticleSearchParams";
import PatentSearchAll from './PatentSearchAll';
import PatentSearchParams from './PatentSearchParams';
import BookSearch1 from "./BookSearch1";
import BookSearch2 from "./BookSearch2";
import PeriodicalSearch1 from "./PeriodicalSearch1";
import PeriodicalSearch2 from "./PeriodicalSearch2";
import EchartsTest2 from "./ArticleAggType";
import EchartsTest from "./ArticleAggUniversity";
import EchartsTest4 from "./ArticleAggMonth";
import EchartsTest6 from "./ArticleAggYear";
import EchartsTest3 from "./PatentAggType";
import EchartsTest5 from "./PatentAggMonth";
import EchartsTest7 from "./PatentAggYear";
import EchartsTest8 from "./PatentAggPubYear";
import BookTagAgg from "./BookTagAgg";
import BookPublishAgg from "./BookPublishAgg";
import BookDateAgg from "./BookDateAgg";
import BookTagAggDetail from "./BookTagAggDetail";
import BookPublishAggDetail from "./BookPublishAggDetail";
import PeriodicalTypeAgg from "./PeriodicalTypeAgg";
import PeriodicalDateAgg from "./PeriodicalDateAgg";
import HomePage from "./HomePage";

ReactDOM.render(
    <Router>
        <App>
            <Route exact path="/" component={HomePage}/>

            <Route path="/article/search/all" component={ArticleSearchAll}/>
            <Route path="/article/search/params" component={ArticleSearchParams}/>

            <Route path="/patent/search/all" component={PatentSearchAll}/>
            <Route path="/patent/search/params" component={PatentSearchParams}/>

            <Route path="/book/search/all" component={BookSearch1}/>
            <Route path="/book/search/params" component={BookSearch2}/>

            <Route path="/periodical/search/all" component={PeriodicalSearch1}/>
            <Route path="/periodical/search/params" component={PeriodicalSearch2}/>

            <Route path="/article/agg/type" component={EchartsTest2}/>
            <Route path="/article/agg/university" component={EchartsTest}/>
            <Route path="/article/agg/month" component={EchartsTest4}/>
            <Route path="/article/agg/year" component={EchartsTest6}/>

            <Route path="/patent/agg/type" component={EchartsTest3}/>
            <Route path="/patent/agg/month" component={EchartsTest5}/>
            <Route path="/patent/agg/year" component={EchartsTest7}/>
            <Route path="/patent/agg/pubyear" component={EchartsTest8}/>

            <Route path="/book/agg/tag" component={BookTagAgg}/>
            <Route path="/book/agg/publish" component={BookPublishAgg}/>
            <Route path="/book/agg/date" component={BookDateAgg}/>
            <Route path="/book/agg/tagDetail" component={BookTagAggDetail}/>
            <Route path="/book/agg/publishDetail" component={BookPublishAggDetail}/>

            <Route path="/periodical/agg/type" component={PeriodicalTypeAgg}/>
            <Route path="/periodical/agg/dateHistogram" component={PeriodicalDateAgg}/>

        </App>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
