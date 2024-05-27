from flask import Flask, render_template, session, redirect, url_for, g, request
from flask_session import Session
from database import get_db, close_db
from forms import RegistrationForm, LoginForm
from flask import Flask, flash, request, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps 

app = Flask(__name__)
app.teardown_appcontext(close_db) 
app.config["SECRET_KEY"] = "this-is-my-secret-key"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)

@app.before_request
def logged_in_user():
    g.user = session.get("user_id", None)


def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect( url_for ("login", next = request.url))
        return view(*args, **kwargs)
    return wrapped_view

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/labyrinth")
@login_required
def labyrinth():
    return render_template("labyrinth.html")


@app.route("/registration", methods=["GET", "POST"])
def registration():

    form = RegistrationForm()

    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        password2 = form.password2.data
        db = get_db()

        exist_user = db.execute("""SELECT *
                                FROM users 
                                WHERE user_id = ?;""", (user_id,)).fetchone()
    
        if exist_user is not None:
            form.user_id.errors.append("This username already exists")

        else:
            db.execute("""INSERT INTO users (user_id, password)
                          VALUES  (?,?);""", (user_id,generate_password_hash(password)))
            db.commit()

            session.clear()
            session["user_id"] = user_id

            return redirect( url_for("index") )
    return render_template("registration.html", form = form)

@app.route("/login", methods=["GET", "POST"])
def login():

    form = LoginForm()

    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        db = get_db()

        exist_user = db.execute("""SELECT *
                                   FROM users 
                                   WHERE user_id = ?;""", (user_id,)).fetchone()
        
        if not exist_user:
            form.user_id.errors.append("This username doesn't exist!")

        elif not check_password_hash(exist_user["password"], password):
            form.password.errors.append("Wrong password!")

        else:

            session.clear()
            session["user_id"] = user_id

            next_page = request.args.get("next")

            if not next_page:
                next_page = url_for("index")
            return redirect(next_page)
        
    return render_template("login.html", form=form)
            
@app.route("/logout")
def logout():
    session.clear()
    return redirect( url_for("login") )

@app.route("/store_score", methods = ["POST"])
def store_score():
    score = request.form["score"]
    new_score = score.split(":")
    new_score= int(new_score[0] + new_score[1])
    db = get_db()

    leaderboard = db.execute(""" SELECT * FROM leaderboard;""").fetchall

    user_in_leaderboard = db.execute(""" SELECT * FROM leaderboard WHERE user_id = ?;""",(session["user_id"],)).fetchone()
    if user_in_leaderboard is not None:
        current_score = user_in_leaderboard["score"]
        current_score = current_score.split(":")
        print(current_score)
        current_score = int(current_score[0] + current_score[1])
        if new_score < current_score:
            db.execute("""UPDATE leaderboard SET score = ? WHERE user_id = ?;""",(score,session["user_id"]))
            db.commit()
    else:

        db.execute("""INSERT INTO leaderboard (user_id, score) VALUES (?,?) ;""",(session["user_id"],score))
        db.commit()

    return render_template("labyrinth.html")

@app.route("/leaderboard")
def leaderboard():
    db = get_db()
    leaderboard = db.execute("""SELECT * FROM leaderboard ORDER BY score ASC;""").fetchall()
    return render_template("leaderboard.html", leaderboard = leaderboard)
