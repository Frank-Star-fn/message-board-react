
import './App.css';
import React from 'react';
import './index.css';
import { useState, useEffect } from 'react';
import MyComponent from './MyComponent'
import CommentBody from './CommentBody'

const App = () => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [content, setContent] = useState('Initial Content');
  // const [inputValue, setInputValue] = useState('');

  // // 处理清空输入框的函数
  // const clearMessage = () => {
  //     setMessage(''); // 将状态变量设置为空字符串来清空输入框
  // };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleButtonClick = async (e) => {

      e.preventDefault(); // 阻止表单的默认提交行为（如果这是在一个表单内）
      // setLoading(true);
      // setError(null); // 重置错误状态

      const formData = {
            name: name,
            message: message
      };

      try {
        const response = await fetch('http://localhost:3001/api/endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // 发送的数据
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result); // 处理响应数据

        // 成功后清空表单
        setMessage('');  // 将状态变量设置为空字符串来清空输入框
        
        // 更新列表
        fetch('http://localhost:3001/api/data')
        .then((response) => response.json())
        .then((posts) => {
           console.log("data = " + JSON.stringify(data));
           setPosts(posts);
        })
        .catch((err) => {
           console.log("ERROR happened");
           console.log(err.message);
        });

      } catch (error) {
        // setError(error.message); // 设置错误消息
      } finally {
        // setLoading(false); // 结束加载状态
      }
    };

  useEffect(() => {
    fetch('http://localhost:3001/api/data')
        .then((response) => response.json())
        .then((posts) => {
          //  console.log("data = " + JSON.stringify(data));
           setPosts(posts);
        })
        .catch((err) => {
          //  console.log("ERROR happened");
           console.log(err.message);
        });
  }, []);

  return (
    <React.Fragment>
      <div className='container mt-4 mb-2'>
        <h2 className="text-blue">留言板 <small>留言列表</small></h2>
      </div>
      
      <div className="container pt-2">
        <div className="py-2 px-2 bg-lightblue">
          <form action="/say" method="GET" className='m-0'>
            
                <div className="row mb-2">
                  <div className='col-md-4'>
                    <input type="text" id="name" name="name" className="name-control" 
                        placeholder="您的姓名" required minLength="1" maxLength="15" onChange={handleNameChange} 
                    />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-10'>
                        <textarea id="message" name="message" className="form-control" 
                            placeholder="您的留言" cols='30' rows='10' required minLength="1" 
                            value={message}
                            maxLength="50" onChange={handleMessageChange}
                        ></textarea>
                  </div>
                    <div className='col-md-2'>
                      <MyComponent onButtonClick={handleButtonClick} />
                    </div>
                </div>
                
          </form>
        </div>

        <CommentBody posts={posts} />
      </div>

      <div className="centered-text bg-dark footer-container fixed-bottom">
        © 2024 Frank_Star
      </div>    
    </React.Fragment>
  );
};

export default App;