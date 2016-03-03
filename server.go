package main

import (
	"fmt"
	"io/ioutil"
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
	fmt.Fprint(w, "{\"data\" : [\"app/images/ppel-image1.png\", \"app/images/city.jpg\", \"app/images/space.jpeg\"]}")
}

func handler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, r.URL.Path[1:])
	//fmt.Println("grabbing " + r.URL.Path[1:])
}

func tabContentHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Request to app/tab_pages acknowledged.")

	jobSearchData, _ := ioutil.ReadFile("app/tab_pages/Job_Search")
	interviewPageData, _ := ioutil.ReadFile("app/tab_pages/Interviews")
	COUGLINKPageData, _ := ioutil.ReadFile("app/tab_pages/COUGLINK")
	careerPageData, _ := ioutil.ReadFile("app/tab_pages/Career_Tips")
	PPELPageData, _ := ioutil.ReadFile("app/tab_pages/PPEL_Calendar")
	contactPageData, _ := ioutil.ReadFile("app/tab_pages/Contact_Us")
	privacyPageData, _ := ioutil.ReadFile("app/tab_pages/Privacy_Policy")

	var toSend = fmt.Sprintf("{\"data\" : [ \"Job Search\",    \"%s\"," +
											"\"Interviews\",    \"%s\"," +
											"\"COUGLINK\",      \"%s\"," +
											"\"Career Tips\",   \"%s\"," +
											"\"PPEL Calendar\", \"%s\"," +
											"\"Contact Us\",    \"%s\"," +
											"\"Privacy Policy\",\"%s\" ]}",
	 jobSearchData, interviewPageData, COUGLINKPageData, careerPageData, PPELPageData, contactPageData, privacyPageData)

	//set writer's Content-Type to be json
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, toSend)
}

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/app", appHandler)
	http.HandleFunc("/app/images", imageHandler)
	http.HandleFunc("/app/tabcontent", tabContentHandler)

	fmt.Println("Listening on 3000")
	http.ListenAndServe(":3000", nil)

}
