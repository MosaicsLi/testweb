import { useEffect, useState,useRef }  from "react";
import React from "react";
import axios from "axios";
import qs from "qs";
import ActiveUserChart from "./charts/ActiveUserChart";
import ExitAnalysisChart from "./charts/ExitAnalysisChart";
import { Card, Col, Container, Row } from "react-bootstrap";

var label='ABC美食',iteration=1,offset=0;

export default function Body() {
  
  
  // API config
  const LOG_API_URL = "http://52.147.71.0:20002/log_api/";
  var LOG_KEYS = {
    shop_label: label,
    iteration: iteration,
    offset: offset,
  };
  const setkey=(setlabel,setiteration,setoffset)=>{
     LOG_KEYS = {
      shop_label: setlabel,
      iteration: setiteration,
      offset: setoffset,
    };
  }
  
  


  // array of object with keys of total_user and date
  const inputEl = useRef(null);
  const [numOfUser, setNumOfUser] = useState([]);
  const [questionMap, setQuestionMap] = useState([]);
  const getShoplabel=(event)=>{
    inputEl.current.focus();
    label=inputEl.current.value;
    setkey(label,iteration,offset);
    setNumOfUser([]);
    setQuestionMap([]);
    getData()
  }
  const getValue1=(event)=>{
    //inputEl.current.focus();
    //label=inputEl.current.value;
    iteration=100;
    offset=0;
    setkey(label,iteration,offset);
    setNumOfUser([]);
    setQuestionMap([]);
    getData()
  }
  const getValue2=(event)=>{
    //inputEl.current.focus();
    //label=inputEl.current.value;
    iteration=50;
    offset=0;
    setkey(label,iteration,offset);
    setNumOfUser([]);
    setQuestionMap([]);
    getData()
  }
  const getValue3=(event)=>{
    //inputEl.current.focus();
    //label=inputEl.current.value;
    iteration=50;
    offset=51;
    setkey(label,iteration,offset);
    setNumOfUser([]);
    setQuestionMap([]);
    getData()
  }

  async function getData() {
    try {
      const res = await axios.post(LOG_API_URL, qs.stringify(LOG_KEYS));
      getActiveUser(res.data);
      getExitAnalysis(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getActiveUser(data) {
    const date_map = new Map();
    const temp_data = data;
    temp_data.forEach((data) => {
      if (data.log_date in date_map) {
        date_map[data.log_date].interactions += 1;
        if (
          !date_map[data.log_date].line_user_name.includes(data.line_user_name)
        ) {
          date_map[data.log_date].line_user_name.push(data.line_user_name);
        }
      } else {
        date_map[data.log_date] = {
          interactions: 1,
          line_user_name: [data.line_user_name],
        };
      }
    });
    for (const key in date_map) {
      setNumOfUser((numOfUser) => [
        ...numOfUser,
        {
          date: key,
          active_user: date_map[key].line_user_name.length,
          interactions: date_map[key].interactions,
        },
      ]);
    }
  }

  async function getExitAnalysis(data) {
    const date_map = new Map();
    const question_map = new Map();
    const temp_data = data;
    temp_data
      .slice()
      .reverse()
      .forEach((data) => {
        if(data.role === "bot"){
    console.log('BOT',data.content);}
    if(data.role === "user"){
      console.log('USER',data.line_user_name+data.content);}
        if (data.role === "bot") {
          if (date_map.has(data.log_date)) {
            // check if the the user is recorded in that date or not
            if (!date_map[data.log_date].includes(data.line_user_name)) {
              // add to the name record if it does not exist
              date_map[data.log_date].push(data.line_user_name);
              // the name is not recorded, then it is a different person
              // check whether his/her question is already recorded or not
              if (data.content in question_map) {
                question_map[data.content] += 1;
              } else {
                question_map[data.content] = 1;
              }
            }
          } else {
            // add new log_date to the date map
            date_map[data.log_date] = [data.line_user_name];
            // check if the question is already available in the question_map or not
            // add the count if it exists, create new key if not
            if (data.content in question_map) {
              question_map[data.content] += 1;
            } else {
              question_map[data.content] = 1;
            }
          }
        }
      });
    for (const key in question_map) {
      setQuestionMap((questionMap) => [
        ...questionMap,
        {
          name: key,
          value: question_map[key],
        },
      ]);
    }
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5">
      <h1 className="p-5">Welcome to your dashboard</h1>
      <div className="edit">
        <input ref={inputEl} type="text" />
        <button onClick={getShoplabel}>inputlabel</button><br></br>
        <button onClick={getValue1}>0~100</button>
        <button onClick={getValue2}>0~50</button>
        <button onClick={getValue3}>50~100</button>
      </div>
      <Container>
        <Row>
          <Col>
            <Card className="card-margin" style={{ width: "400px" }}>
              <Card.Body>
                <Card.Title>跳出點分析</Card.Title>
                <ExitAnalysisChart
                  width={300}
                  height={250}
                  data={questionMap}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card-margin" style={{ width: "650px" }}>
              <Card.Body>
                <Card.Title>活躍客戶分析</Card.Title>
                <ActiveUserChart width={600} height={250} data={numOfUser} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
