package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"encoding/json"
	//"os"
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
	yourVideos, _ := ioutil.ReadFile("app/tab_content/YourVideos.html")

	type Page struct {
			Title string
			Content string
		}

	type Book struct {
			Pages []Page
		}

	var s1 = fmt.Sprintf("%s", jobSearchData)
	var s2 = fmt.Sprintf("%s", careerTips)
	var s3 = fmt.Sprintf("%s", interviews)
	var s4 = fmt.Sprintf("%s", yourVideos)

	var book = Book {
		[]Page{
			{"Job Search", s1},
			{"Career Tips", s2},
			{"Interviews", s3},
			{"Your Videos", s4},
		},
	}

	b, err := json.Marshal(book)	
	if err != nil {
		fmt.Println("error:", err)
	}
	//os.Stdout.Write(b)
	toSend := string(b[:]) 

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, toSend)
}


func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/app", appHandler)
	http.HandleFunc("/app/images", imageHandler)
	http.HandleFunc("/app/navbar/items.json", navHandler)
	http.HandleFunc("/app/tabcontent", tabContentHandler)

	fmt.Println("Listening on 3000")
	http.ListenAndServe(":3000", nil)

}
