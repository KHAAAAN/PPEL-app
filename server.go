package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"io/ioutil"
	"log"
	"net/http"
)

//this stops user client from seeing anything on the server.
func appHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request to app acknowledged.")
}

func imageHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request to app/images acknowledged.")

	//set writer's Content-Type to be json
	w.Header().Set("Content-Type", "application/json")
	http.ServeFile(w, r, r.URL.Path[1:])
}

func navHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request to app/navbar/items.json acknowledged.")
	w.Header().Set("Content-Type", "application/json")
	http.ServeFile(w, r, r.URL.Path[1:])
}

func handler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, r.URL.Path[1:])
	//fmt.Println("grabbing " + r.URL.Path[1:])
}

func tabContentHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request to app/tab_pages acknowledged.")

	jobSearchData, _ := ioutil.ReadFile("app/tab_content/JobSearch.html")
	careerTips, _ := ioutil.ReadFile("app/tab_content/CareerTips.html")
	interviews, _ := ioutil.ReadFile("app/tab_content/Interviews.html")

	type Page struct {
		Title   string
		Content string
	}

	type Book struct {
		Pages []Page
	}

	var s1 = fmt.Sprintf("%s", jobSearchData)
	var s2 = fmt.Sprintf("%s", careerTips)
	var s3 = fmt.Sprintf("%s", interviews)

	var book = Book{
		[]Page{
			{"Job Search", s1},
			{"Career Tips", s2},
			{"Interviews", s3},
		},
	}

	b, err := json.Marshal(book)
	if err != nil {
		fmt.Println("error:", err)
	}
	//os.Stdout.Write(b)
	toSend := string(b[:])
	//fmt.Println(toSend)

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, toSend)
}

func loginHandler(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	m := r.URL.Query()
	id := m["id"][0]

	fmt.Println(id)

	//now check if id exists in our database
	rows, err := db.Query("SELECT ORD(admin) admin, email, ts FROM USER WHERE id=?", id)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var exists int = 0

	var admin int = 0
	var email string
	var ts string

	for rows.Next() {
		if err := rows.Scan(&admin, &email, &ts); err != nil {
			log.Fatal(err)
		}
		if admin == 49 {
			admin = 1
		}

		fmt.Printf("admin = %d, ", admin)
		fmt.Printf("email = %s, ", email)
		fmt.Printf("ts = %s", ts)
		exists = 1
	}

	w.Header().Set("Content-Type", "application/json")
	if exists == 1 {
		fmt.Fprintf(w, "{\"data\" : { \"admin\" : %d, \"email\" : \"%s\", \"ts\" : \"%s\"} }", admin, email, ts)
	} else {
		fmt.Fprintf(w, "{\"data\" : 0}")
	}
}

func videoAnswers(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	m := r.URL.Query()
	id := m["id"][0]
	questionID := m["questionID"][0]

	fmt.Println(id)
	//first look for public video Questions
	rows, err := db.Query("SELECT path, isPublic, ts FROM VideoAnswers WHERE id = ? AND questionID = ?", id, questionID)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	type VideoAnswer struct {
		QuestionId int    `json:"questionID"`
		Id         string `json:"id"`
		Path       string `json:"path"`
		IsPublic   int    `json:"isPublic"`
		Ts         string `json:"ts"`
	}

	var videoAnswers []VideoAnswer
	var va VideoAnswer

	exists := 0

	for rows.Next() {
		va.Id = ""
		if err := rows.Scan(&va.Path, &va.IsPublic, &va.Ts); err != nil {
			log.Fatal(err)
		}
		if va.IsPublic == 49 {
			va.IsPublic = 1
		} else if va.IsPublic != 1 { //get rid of after fixing db
			va.IsPublic = 0
		}

		fmt.Printf("va.questionId = %d, va.id = %d, va.path = %s, va.isPublic = %t, va.ts = %s", va.QuestionId, va.Id, va.Path, va.IsPublic, va.Ts)
		videoAnswers = append(videoAnswers, va)
		exists = 1

	}

	w.Header().Set("Content-Type", "application/json")
	if exists == 1 {
		b, err := json.Marshal(videoAnswers)
		if err != nil {
			fmt.Println("error:", err)
		}
		//os.Stdout.Write(b)
		toSend := string(b[:])
		//fmt.Println(toSend)

		w.Header().Set("Content-Type", "application/json")
		fmt.Fprint(w, toSend)
	} else {
		fmt.Fprintf(w, "{\"data\" : 0}")
	}
}

func publicVideoQAHandler(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	m := r.URL.Query()
	id := m["id"][0]

	fmt.Println(id)

	//first look for public video Questions
	rows, err := db.Query("SELECT questionId, path, isPublic, ts FROM VideoQuestions WHERE id IS NULL")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	type VideoQuestion struct {
		QuestionId int    `json:"questionID"`
		Id         string `json:"id"`
		Path       string `json:"path"`
		IsPublic   int    `json:"isPublic"`
		Ts         string `json:"ts"`
	}

	var videoQuestions []VideoQuestion
	var vq VideoQuestion

	exists := 0

	for rows.Next() {
		vq.Id = ""
		if err := rows.Scan(&vq.QuestionId, &vq.Path, &vq.IsPublic, &vq.Ts); err != nil {
			log.Fatal(err)
		}

		if vq.IsPublic == 49 {
			vq.IsPublic = 1
		} else if vq.IsPublic != 1 { //get rid of after fixing db
			vq.IsPublic = 0
		}

		fmt.Printf("vq.questionId = %d, vq.id = %d, vq.path = %s, vq.isPublic = %t, vq.ts = %s", vq.QuestionId, vq.Id, vq.Path, vq.IsPublic, vq.Ts)
		videoQuestions = append(videoQuestions, vq)
		exists = 1

	}

	w.Header().Set("Content-Type", "application/json")
	if exists == 1 {
		b, err := json.Marshal(videoQuestions)
		if err != nil {
			fmt.Println("error:", err)
		}
		//os.Stdout.Write(b)
		toSend := string(b[:])
		//fmt.Println(toSend)

		w.Header().Set("Content-Type", "application/json")
		fmt.Fprint(w, toSend)
	} else {
		fmt.Fprintf(w, "{\"data\" : 0}")
	}
}

func saveVideoHandler(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	m := r.URL.Query()
	id, videoName, isPublic, questionID := m["id"][0], m["videoName"][0], m["isPublic"][0], m["questionID"][0]

	fmt.Println(id)
	fmt.Println(videoName)
	fmt.Println(isPublic)
	fmt.Println(questionID)

	path := "/app/videos/" + id + "/" + videoName

	result, _ := db.Exec("INSERT INTO VideoAnswers(id, path, isPublic, questionID) VALUES(?, ?, ?, ?) where questionID=?", id, path, isPublic, questionID)
	rowsAffected, _ := result.RowsAffected()

	fmt.Println(rowsAffected)

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "{\"data\" : \"%d\"}", rowsAffected)
}

func deleteVideoHandler(w http.ResponseWriter, r *http.Request, db *sql.DB) {

}

func refreshHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
	fmt.Println("browser refresh.")
}

func testSaveHandler(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	fmt.Println("POST to test_save acknowledged")

	m := r.URL.Query()
	id, fname, isPublic, questionID := m["id"][0], m["fname"][0], m["isPublic"][0], m["questionID"][0]
	//first make path, change extension webm handling later
	path := "/app/videos/" + id + "/" + fname + ".webm"

	//insert metadata into DB
	db.Exec("INSERT INTO VideoAnswers(id, path, isPublic, questionID) Values(?, ?, ?, ?)", id, path, isPublic, questionID)
}

func main() {

	// Create the databse handle, confirm driver is present
	db, _ := sql.Open("mysql", "user:pass@/PPEL")
	defer db.Close()

	// Connect and check the server version
	var version string
	db.QueryRow("SELECT VERSION()").Scan(&version)
	fmt.Println("Successfully connected to:", version)

	http.HandleFunc("/", handler)
	http.HandleFunc("/app", appHandler)
	http.HandleFunc("/app/images", imageHandler)
	http.HandleFunc("/app/navbar/items.json", navHandler)
	http.HandleFunc("/app/tabcontent", tabContentHandler)

	//query requests
	http.HandleFunc("/login_attempt", func(w http.ResponseWriter, r *http.Request) {
		loginHandler(w, r, db)
	})

	http.HandleFunc("/video_answers", func(w http.ResponseWriter, r *http.Request) {
		videoAnswers(w, r, db)
	})

	http.HandleFunc("/public_video_QA", func(w http.ResponseWriter, r *http.Request) {
		publicVideoQAHandler(w, r, db)
	})

	http.HandleFunc("/save_video", func(w http.ResponseWriter, r *http.Request) {
		saveVideoHandler(w, r, db)
	})

	http.HandleFunc("/delete_video", func(w http.ResponseWriter, r *http.Request) {
		deleteVideoHandler(w, r, db)
	})

	http.HandleFunc("/test_save", func(w http.ResponseWriter, r *http.Request) {
		testSaveHandler(w, r, db)
	})

	/*******All refresh/history*****/
	http.HandleFunc("/home", refreshHandler)
	http.HandleFunc("/login", refreshHandler)

	fmt.Println("Listening on 3000")
	http.ListenAndServe(":3000", nil)

}
