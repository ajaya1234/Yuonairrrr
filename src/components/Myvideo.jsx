import React from 'react'
import axios from 'axios'
import Header from './Header'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { useEffect } from 'react'

const Myvideo = () => {
    const [getdownloadd, setGetdownloadd] = useState([]);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      
      const timeDiff = Math.abs(now - date);
      
      const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
      if (years > 0) {
        return years === 1 ? '1 year ago' : `${years} years ago`;
      }
      
      const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
      if (months > 0) {
        return months === 1 ? '1 month ago' : `${months} months ago`;
      }
      
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      if (days > 0) {
        return days === 1 ? '1 day ago' : `${days} days ago`;
      }
      
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      if (hours > 0) {
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
      }
      
      const minutes = Math.floor(timeDiff / (1000 * 60));
      if (minutes > 0) {
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
      }
      
      return 'Just now';
    };



    useEffect(() => {
        getdownload();
      }, []);
    
      const getdownload = async () => {
        const userid = localStorage.getItem("_id");
    
        const options = {
          headers: {
            "content-type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
        };
    
        const data = {
          user_id: userid,
        };
    
        try {
          const response = await axios.post(
            "http://16.16.91.234:3003/api/get_download_video",
            data,
            options
          );
          setGetdownloadd(response.data.data);
        } catch (err) {
          console.error(err);
        }
      };




      const removeCartitem = (item) => {
        const idddd = localStorage.getItem("_id");
        const options = {
          headers: {
            "content-type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
        };
    
        const data = JSON.stringify({
          user_id: idddd,
          video_id: item,
        });
    
        axios
          .post("http://16.16.91.234:3003/api/delete_download_video", data, options)
          .then((res) => {
            getdownload();
          })
          .catch((err) => {
            console.error(err);
          });
      };



      

    return (
        <div>
<Header/>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper">
                <div className="container-fluid">
                <h4>My Download </h4>
                <div className="video-block section-padding">
                  <div className="tab-content" id="ex1-content">
                    <div
                      className="tab-pane fade show active"
                      id="ex1-tabs-1"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-1"
                    >
                      <div className="row">
                        {getdownloadd && getdownloadd.length > 0 ? (
                          getdownloadd.map((list) => (
                            <div
                              className="col-sm-4 mb-4  "
                              style={{
                                borderRadius: "10px",
                                width: "100%",
                                marginLeft: "-6px",
                              }}
                            >
                              <button
                                style={{ borderRadius: "15px" }}
                                className="fas fa-times-circle btn "
                                onClick={() =>
                                  removeCartitem(list.video_data._id)
                                }
                              ></button>
                              <div
                                className="video-card"
                                style={{ width: "100%", borderRadius: "10px" }}
                              >

                                <div
                                  className="video-card-image"
                                  style={{
                                    borderRadius: "10px",
                                    width: "100%",
                                    height: "160px",
                                  }}
                                >
                                  <Link
                                    className="play-icon"
                                    to="/video_page"  onClick={() => {
                                      localStorage.setItem("videoiid", list.video_id);
                                      localStorage.setItem("useridd", list.user_id);
                                      localStorage.setItem(
                                        "channelid",
                                        list.channel_id
                                      );
                                      localStorage.setItem("categorytpee", list.category_type);
                                    }}
                                  >
                                    <i className="fas fa-play-circle" />
                                  </Link>
                                  <Link to="/video_page"  onClick={() => {
                                localStorage.setItem("videoiid", list.video_id);
                                localStorage.setItem("useridd", list.user_id);
                                localStorage.setItem(
                                  "channelid",
                                  list.channel_id
                                );
                                localStorage.setItem("categorytpee", list.category_type);
                              }}>
                                    <img
                                      className="img-fluid"
                                      src={
                                        "http://16.16.91.234:3003/uploads/" +
                                        list.video_data.video[1].filename
                                      }
                                      alt
                                    />
                                  </Link>
                                  {/* <div className="time">3:50</div> */}
                                </div>
                                <div className="video-card-body">
                                  <div className="video-title">
                                    <Link to="/video_page"  onClick={() => {
                                localStorage.setItem("videoiid", list._id);
                                localStorage.setItem("useridd", list.user_id);
                                localStorage.setItem(
                                  "channelid",
                                  list.channel_id
                                );
                                localStorage.setItem("categorytpee", list.category_type);
                              }}>
                                      {list.video_data.video_name}
                                    </Link>
                                  </div>
                                  <div
                                    className="single-video-author box mb-3"
                                    style={{ paddingLeft: 0, paddingRight: 0 }}
                                  >
                                    {/* <div className="float-right">
                                      <p>
                                        <i className="fas fa-eye" /> {list.video_data[0].video_views}
                                      </p>
                                      <p>
                                        <i className="fa fa-thumbs-up" /> 131K
                                      </p>
                                    </div> */}
                                    <Link onClick={() => {
                localStorage.setItem("videoiid", list._id);
                localStorage.setItem("useridd", list.user_id);
                localStorage.setItem("channelid", list.channel_id);
                localStorage.setItem("categorytpee", list.category_type);
              }} to="/view_profile">
                                      {" "}
                                      <img
                                        className="img-fluid"
                                        src={
                                          "http://16.16.91.234:3003/uploads/" +
                                          list.video_data.video[1].filename
                                        }
                                        alt
                                      />
                                    </Link>
                                    <p>
                                      <Link onClick={() => {
                localStorage.setItem("videoiid", list._id);
                localStorage.setItem("useridd", list.user_id);
                localStorage.setItem("channelid", list.channel_id);
                localStorage.setItem("categorytpee", list.category_type);
              }} to="/view_profile">
                                        <strong>
                                          {list.video_data.channel_name}
                                        </strong>
                                      </Link>{" "}
                                      
                                    </p>
                                    <p>{formatDate(list.current_date)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-md-12">No Data found.</div>
                        )}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="ex1-tabs-3"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-3"
                    >
                      <div
                        className="col-xl-3 col-sm-6 mb-3"
                        style={{ paddingLeft: 10, paddingRight: 0 }}
                      >
                        <div className="video-card">
                          <div
                            className="video-card-image"
                            style={{ borderRadius: 15 }}
                          >
                            <a className="play-icon" href="video-page.html">
                              <i className="fas fa-play-circle" />
                            </a>
                            <a href="video-page.html">
                              <img className="img-fluid" src="img/v1.png" alt />
                            </a>
                            <a href="video-page.html">
                              <div
                                className="time"
                                style={{ bottom: 0, right: 0 }}
                              >
                                <h3
                                  style={{
                                    position: "relative",
                                    top: 35,
                                    left: 25,
                                  }}
                                >
                                  10
                                </h3>
                                <svg
                                  viewBox="0 0 24 24"
                                  preserveAspectRatio="xMidYMid meet"
                                  focusable="false"
                                  className="style-scope yt-icon"
                                  style={{
                                    pointerEvents: "none",
                                    display: "block",
                                    width: 100,
                                    height: 120,
                                  }}
                                >
                                  <g className="style-scope yt-icon">
                                    sddfdf
                                    <path
                                      d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"
                                      className="style-scope yt-icon"
                                    />
                                  </g>
                                </svg>
                              </div>
                            </a>
                          </div>
                          <div className="video-card-body">
                            <div className="video-title">
                              <a href="video-page.html">
                                There are many variations of passages of Lorem
                              </a>
                            </div>
                            <div
                              className="single-video-author box mb-3"
                              style={{ paddingLeft: 0, paddingRight: 0 }}
                            >
                              <div className="float-right">
                                <p>
                                  <i className="fas fa-eye" /> 10.4M
                                </p>
                                <p>
                                  <i className="fa fa-thumbs-up" /> 131K
                                </p>
                              </div>
                              <a href="viewprofile.html">
                                {" "}
                                <img
                                  className="img-fluid"
                                  src="img/s4.png"
                                  alt
                                />
                              </a>
                              <p>
                                <a href="viewprofile.html">
                                  <strong>History</strong>
                                </a>{" "}
                                <span
                                  title
                                  data-placement="top"
                                  data-toggle="tooltip"
                                  data-original-title="Verified"
                                >
                                  <i className="fas fa-check-circle text-success" />
                                </span>
                              </p>
                              <p>3 Months ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>



                  

                </div>

            </div>
        </div>
    )
}

export default Myvideo
