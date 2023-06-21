import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './App.css';

function App() {
  type PostData = {
    id: number;
    content: string;
    date: string;
    like: number;
    userName: string;
    userId: number;
  }

  // モーダル用
  const [show, setShow] = useState(false);
  // フォーム用
  const [text, setText] = useState<string>("");
  const[tulartDatas, setTulartDatas] = useState<PostData[]>([]);

  // モーダル閉じる
  const handleClose = () => {
    setShow(false);
  }
  // モーダル開く
  const handleShow = () => {
    setShow(true);
  }

  // 表示処理
  useEffect(() => {
    fetch('http://localhost:5000/tulart-data')
      .then((response) => {
        if (!response.ok) {
          response.json().then((json) => {
            console.error(json);
          });
          return;
        }
        response.json().then((json) => {
          setTulartDatas(json);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  // 投稿処理
  const handlePost = () => {
    console.log("送るよ！");

    const postData: PostData = {
      id: 50,
      content: text,
      date: "0000-00-00",
      like: 0,
      userName: "太郎",
      userId: 2
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };
    fetch('http://localhost:5000/tulart', options)
      .then((response) => {
        console.log("送れた！");
        if (!response.ok) {
          response.json().then((json) => {
            console.error(json);
          });
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    handleClose();
  }


  return (
    <div className="App">
      <div>
        <ul>
          {tulartDatas.map((value) => {
            return(
              <li key={value.id}>
                {value.userName}
                {value.content}
              </li>
            );
          })}
        </ul>
      </div>

      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} style={{marginTop: "150px"}}>
        <Modal.Header closeButton>
          <Modal.Title>投稿内容を入力してください。</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
               <Form.Label>Example textarea</Form.Label>
               <Form.Control as="textarea" rows={10} onChange={(e) => setText(e.target.value)}/>
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handlePost}>
            投稿
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
