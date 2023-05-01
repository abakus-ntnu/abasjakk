

import "src/styles/app.css";
import "src/styles/polls.css";

const Polls = () => {
    return (
        <>
            <div className="titleBox">
                <h1>Polls</h1>
            </div>
            <div className="pollsBox">
                <div class="strawpoll-embed" id="strawpoll_jVyG81Ed9n7" style="height: 480px; max-width: 640px; width: 100%; margin: 0 auto; display: flex; flex-direction: column;">
                    <iframe title="StrawPoll Embed" id="strawpoll_iframe_jVyG81Ed9n7" src="https://strawpoll.com/embed/polls/jVyG81Ed9n7" style="position: static; visibility: visible; display: block; width: 100%; flex-grow: 1;" frameBorder="0" allowFullScreen allowTransparency>Loading...</iframe>
                    <script async src="https://cdn.strawpoll.com/dist/widgets.js" charSet="utf-8" />
                </div>
                <div className="strawpoll-embed" id="strawpoll_6QnMOwWvoZe" style="height: 480px; max-width: 640px; width: 100%; margin: 0 auto; display: flex; flex-direction: column;">
                    <iframe title="StrawPoll Embed" id="strawpoll_iframe_6QnMOwWvoZe" src="https://strawpoll.com/embed/polls/6QnMOwWvoZe" style="position: static; visibility: visible; display: block; width: 100%; flex-grow: 1;" frameBorder="0" allowFullScreen allowTransparency>Loading...</iframe>
                    <script async src="https://cdn.strawpoll.com/dist/widgets.js" charSet="utf-8" />
                </div>
                <div className="strawpoll-embed" id="strawpoll_3RnYlYNrQye" style="height: 544px; max-width: 640px; width: 100%; margin: 0 auto; display: flex; flex-direction: column;">
                    <iframe title="StrawPoll Embed" id="strawpoll_iframe_3RnYlYNrQye" src="https://strawpoll.com/embed/polls/3RnYlYNrQye" style="position: static; visibility: visible; display: block; width: 100%; flex-grow: 1;" frameBorder="0" allowFullScreen allowTransparency>Loading...</iframe>
                    <script async src="https://cdn.strawpoll.com/dist/widgets.js" charSet="utf-8" />
                </div>
            </div>    
        </>
    );
}


export default Polls;