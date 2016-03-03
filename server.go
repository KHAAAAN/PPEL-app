package main

import (
	"net/http"
	"fmt"
)

//this stops user client from seeing anything on the server.
func appHandler(w http.ResponseWriter, r *http.Request){
	fmt.Println("Request to app acknowledged.")
}

func imageHandler(w http.ResponseWriter, r *http.Request){
	fmt.Println("Request to app/images acknowledged.")

	//set writer's Content-Type to be json
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, "{\"data\" : [\"app/images/ppel-image1.png\", \"app/images/city.jpg\", \"app/images/space.jpeg\"]}")
}

func navHandler(w http.ResponseWriter, r *http.Request){	
	fmt.Println("Request to app/navbar/items.json acknowledged.")
	w.Header().Set("Content-Type", "application/json")
	http.ServeFile(w, r, r.URL.Path[1:])
}

func handler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, r.URL.Path[1:])
	//fmt.Println("grabbing " + r.URL.Path[1:])
}

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/app", appHandler)
	http.HandleFunc("/app/images", imageHandler)
	http.HandleFunc("/app/navbar/items.json", navHandler)

	fmt.Println("Listening on 3000")
	http.ListenAndServe(":3000", nil)

}
