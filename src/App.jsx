import { useEffect, useState } from 'react'
import {
  Apple, ArrowDownRight, ArrowRight, Bell, Check, ChevronDown, Clock3,
  Dumbbell, Flame, Footprints, Heart, Home, Leaf, Menu, MessageCircle,
  Plus, Search, Send, Settings2, Sparkles, Trophy, UserRound, Users,
  Waves, X,
} from 'lucide-react'

const initialMeals = [
  { id: 1, name: 'Oats with banana', meal: 'Breakfast', calories: 320, protein: 12, carbs: 54, fat: 8, emoji: '🥣' },
  { id: 2, name: 'Jollof rice & grilled chicken', meal: 'Lunch', calories: 560, protein: 34, carbs: 67, fat: 18, emoji: '🍛' },
]

const foods = [
  { name: 'Jollof rice', category: 'Rice', calories: 450, protein: 12, carbs: 65, fat: 14, emoji: '🍛' },
  { name: 'Moi moi', category: 'Legumes', calories: 220, protein: 12, carbs: 28, fat: 6, emoji: '🫘' },
  { name: 'Boiled yam', category: 'Tubers', calories: 260, protein: 3, carbs: 60, fat: 0, emoji: '🍠' },
  { name: 'Egusi soup', category: 'Soups', calories: 300, protein: 14, carbs: 8, fat: 24, emoji: '🥘' },
  { name: 'Suya', category: 'Protein', calories: 180, protein: 20, carbs: 3, fat: 10, emoji: '🍢' },
  { name: 'Akara', category: 'Legumes', calories: 150, protein: 8, carbs: 18, fat: 5, emoji: '🟤' },
  { name: 'Boiled plantain', category: 'Tubers', calories: 180, protein: 1, carbs: 47, fat: 0, emoji: '🍌' },
  { name: 'Zobo', category: 'Drinks', calories: 90, protein: 0, carbs: 22, fat: 0, emoji: '🥤' },
]

const workouts = [
  { id: 'full-body', title: 'Full body, no equipment', kind: 'At home', level: 'Beginner', minutes: 20, kcal: 180, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85', description: 'A feel-good strength session you can do anywhere.', exercises: ['Warm up · 2 min', 'Bodyweight squats · 3 × 12', 'Incline push-ups · 3 × 10', 'Glute bridges · 3 × 15', 'Standing stretch · 2 min'] },
  { id: 'walk', title: 'Lagos pace walk', kind: 'Outdoors', level: 'Easy', minutes: 25, kcal: 130, image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=85', description: 'A brisk walk to clear your head and get your steps in.', exercises: ['Easy pace · 5 min', 'Brisk walk · 15 min', 'Cool down · 5 min'] },
  { id: 'core', title: 'Core & posture', kind: 'At home', level: 'Steady', minutes: 15, kcal: 110, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85', description: 'Build a strong middle, one controlled rep at a time.', exercises: ['Cat-cow · 60 sec', 'Dead bug · 3 × 10', 'Bird dog · 3 × 8', 'Forearm plank · 3 × 25 sec'] },
  { id: 'strength', title: 'Strength foundations', kind: 'Gym', level: 'Intermediate', minutes: 35, kcal: 260, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85', description: 'A practical, full-body gym session built around the basics.', exercises: ['Warm up · 5 min', 'Goblet squat · 3 × 10', 'Dumbbell row · 3 × 10', 'Dumbbell press · 3 × 10', 'Walk & stretch · 5 min'] },
]

const starterPosts = [
  { id: 1, name: 'Tomi A.', place: 'Ikeja, Lagos', time: '18 min ago', text: 'First 5K done before work! The early morning air was doing the most today. 🏃🏾‍♀️', likes: 24, emoji: '🏅', color: 'peach' },
  { id: 2, name: 'Chinedu O.', place: 'Enugu', time: '1 hr ago', text: 'Swapped my usual snack for boiled plantain and eggs. Simple, filling, and no afternoon crash.', likes: 16, emoji: '🍌', color: 'mint' },
  { id: 3, name: 'Aisha M.', place: 'Abuja', time: '3 hrs ago', text: 'Small wins count. 20 minutes of movement between meetings is still showing up for yourself.', likes: 38, emoji: '✨', color: 'yellow' },
]

const navItems = [
  { id: 'Home', icon: Home },
  { id: 'Workouts', icon: Dumbbell },
  { id: 'Nutrition', icon: Apple },
  { id: 'Community', icon: Users },
  { id: 'Coach', icon: Sparkles },
]

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function useSavedState(key, initialValue) {
  const [value, setValue] = useState(() => readStorage(key, initialValue))
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage can be unavailable */ }
  }, [key, value])
  return [value, setValue]
}

function todayLabel() {
  return new Intl.DateTimeFormat('en-NG', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())
}

function localDayKey() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function App() {
  const [page, setPage] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [water, setWater] = useSavedState(`afrifit-water-${localDayKey()}`, 1250)
  const [meals, setMeals] = useSavedState(`afrifit-meals-${localDayKey()}`, initialMeals)
  const [finished, setFinished] = useSavedState('afrifit-workouts', 2)
  const [workout, setWorkout] = useState(null)
  const [posts, setPosts] = useState(starterPosts)
  const [liked, setLiked] = useState([])

  const calories = meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0)
  const protein = meals.reduce((sum, meal) => sum + Number(meal.protein || 0), 0)

  function beginWorkout(item) {
    setWorkout(item)
    setPage('Workouts')
  }

  function completeWorkout() {
    setFinished((count) => count + 1)
    setWorkout(null)
    setPage('Home')
  }

  function addMeal(food, meal = 'Snack') {
    setMeals((items) => [...items, { ...food, id: Date.now(), meal }])
  }

  function toggleLike(id) {
    setLiked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); setPage('Home') }} aria-label="AFRIFIT home">
          <span className="brand-mark"><ActivityMark /></span><span>AFRI<span>FIT</span></span>
        </a>
        <div className="side-caption">YOUR SPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ id, icon: Icon }) => (
            <button key={id} className={`nav-link ${page === id ? 'active' : ''}`} onClick={() => { setPage(id); setWorkout(null); setMenuOpen(false) }}>
              <Icon size={19} strokeWidth={1.8} /><span>{id}</span>{id === 'Coach' && <span className="nav-new">AI</span>}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="streak-card">
            <span className="streak-icon"><Flame size={18} fill="currentColor" /></span>
            <div><strong>4 day streak</strong><span>You're building a rhythm</span></div>
          </div>
          <button className={`nav-link ${page === 'Profile' ? 'active' : ''}`} onClick={() => { setPage('Profile'); setMenuOpen(false) }}><UserRound size={19} strokeWidth={1.8} /><span>My profile</span></button>
          <div className="sidebar-user"><div className="avatar avatar-small">C</div><div><strong>Chika N.</strong><span>Starter plan</span></div><button aria-label="Settings" onClick={() => setPage('Profile')}><Settings2 size={17} /></button></div>
        </div>
      </aside>

      {menuOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={21} /></button>
          <div className="breadcrumb"><span>AFRIFIT</span><span className="crumb-slash">/</span><strong>{workout ? 'Workout player' : page}</strong></div>
          <div className="top-actions"><span className="date-pill">{todayLabel()}</span><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button><button className="avatar avatar-top" onClick={() => setPage('Profile')} aria-label="Open profile">C</button></div>
        </header>

        {workout ? <WorkoutPlayer workout={workout} onFinish={completeWorkout} onClose={() => setWorkout(null)} /> : (
          <div className="page-wrap" key={page}>
            {page === 'Home' && <HomePage calories={calories} protein={protein} water={water} setWater={setWater} finished={finished} onNavigate={setPage} onStart={() => beginWorkout(workouts[0])} />}
            {page === 'Workouts' && <WorkoutsPage onStart={beginWorkout} onCoach={() => setPage('Coach')} />}
            {page === 'Nutrition' && <NutritionPage meals={meals} calories={calories} protein={protein} onAdd={addMeal} />}
            {page === 'Community' && <CommunityPage posts={posts} liked={liked} onLike={toggleLike} />}
            {page === 'Coach' && <CoachPage />}
            {page === 'Profile' && <ProfilePage finished={finished} water={water} meals={meals.length} />}
          </div>
        )}
      </main>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.filter((item) => item.id !== 'Coach').map(({ id, icon: Icon }) => <button key={id} className={page === id ? 'selected' : ''} onClick={() => { setPage(id); setWorkout(null) }}><Icon size={19} /><span>{id === 'Workouts' ? 'Move' : id}</span></button>)}
      </nav>
    </div>
  )
}

function ActivityMark() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 17h7l3.2-7 5.2 13 3.1-6H28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function PageHeading({ eyebrow, title, subtitle, action }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action}</div>
}

function HomePage({ calories, protein, water, setWater, finished, onNavigate, onStart }) {
  const waterPercent = Math.min(100, Math.round(water / 2500 * 100))
  return <>
    <PageHeading eyebrow={todayLabel().toUpperCase()} title={<>You’re showing up, <span>Chika.</span></>} subtitle="A little movement today goes a long way." action={<button className="button button-outline hide-small" onClick={() => onNavigate('Nutrition')}><Plus size={16} /> Log a meal</button>} />
    <section className="hero-banner">
      <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1500&q=90" alt="Athlete stretching at sunrise" />
      <div className="hero-shade" />
      <div className="hero-content"><span className="hero-kicker"><Sparkles size={14} /> YOUR DAILY RESET</span><h2>Make today<br />feel <em>strong.</em></h2><p>20 minutes. No equipment. Just you and a little space.</p><button className="button button-lime" onClick={onStart}>Start today’s workout <ArrowRight size={16} /></button></div>
      <div className="hero-duration"><Clock3 size={15} /> 20 MIN <span>·</span> FULL BODY</div>
    </section>

    <div className="section-line"><div><h2>Today, at a glance</h2><span>Your effort is adding up</span></div><button className="text-button" onClick={() => onNavigate('Profile')}>See progress <ArrowRight size={15} /></button></div>
    <section className="stats-grid">
      <StatCard icon={Flame} label="Move streak" value="4 days" note="Best: 12 days" theme="orange" />
      <StatCard icon={Dumbbell} label="Workouts this week" value={`${finished} sessions`} note="Goal: 4 sessions" theme="green" />
      <StatCard icon={Footprints} label="Steps today" value="6,240" note="3,760 to your goal" theme="blue" />
      <StatCard icon={Waves} label="Water today" value={`${water.toLocaleString()} ml`} note="Goal: 2,500 ml" theme="aqua" />
    </section>

    <div className="dashboard-grid">
      <section className="panel movement-panel">
        <div className="panel-head"><div><div className="eyebrow">YOUR CONSISTENCY</div><h3>Movement this week</h3></div><button className="select-button">This week <ChevronDown size={14} /></button></div>
        <div className="chart-summary"><strong>3h 20m</strong><span className="trend"><ArrowDownRight size={14} /> 12% more than last week</span></div>
        <WeeklyChart />
      </section>
      <section className="panel hydration-panel">
        <div className="panel-head"><div><div className="eyebrow">SMALL SIPS ADD UP</div><h3>Hydration</h3></div><span className="water-icon"><Waves size={17} /></span></div>
        <div className="water-reading"><strong>{(water / 1000).toFixed(2)}<small> L</small></strong><span>of 2.5 L goal</span></div>
        <div className="water-track"><span style={{ width: `${waterPercent}%` }} /></div>
        <div className="water-foot"><span>{waterPercent}% of daily goal</span><button className="add-water" onClick={() => setWater((amount) => Math.min(4000, amount + 250))}><Plus size={15} /> 250 ml</button></div>
        <div className="water-cups" aria-label={`${waterPercent}% water goal reached`}>{Array.from({ length: 8 }, (_, i) => <span key={i} className={i < Math.ceil(waterPercent / 12.5) ? 'filled' : ''}><Waves size={13} /></span>)}</div>
      </section>
    </div>

    <div className="section-line section-gap"><div><h2>Keep your rhythm</h2><span>Simple choices, made for real life</span></div></div>
    <section className="bottom-grid">
      <button className="feature-row meal-feature" onClick={() => onNavigate('Nutrition')}><span className="feature-icon"><Leaf size={19} /></span><span className="feature-copy"><strong>Food that feels like home</strong><small>{calories.toLocaleString()} kcal logged today · {protein}g protein</small></span><span className="feature-arrow"><ArrowRight size={17} /></span></button>
      <button className="feature-row community-feature" onClick={() => onNavigate('Community')}><span className="feature-icon"><Users size={19} /></span><span className="feature-copy"><strong>Your people are here</strong><small>Celebrate small wins together</small></span><span className="feature-arrow"><ArrowRight size={17} /></span></button>
    </section>
  </>
}

function StatCard({ icon: Icon, label, value, note, theme }) {
  return <div className="stat-card"><span className={`stat-icon ${theme}`}><Icon size={17} /></span><span className="stat-label">{label}</span><strong>{value}</strong><small>{note}</small></div>
}

function WeeklyChart() {
  const bars = [38, 65, 48, 85, 57, 100, 34]
  return <div className="week-chart" aria-label="Weekly activity bar chart">
    <div className="chart-guides"><i /><i /><i /></div>
    <div className="chart-bars">{bars.map((height, index) => <div className="chart-day" key={index}><div className={`bar ${index === 5 ? 'today' : ''}`} style={{ height: `${height}%` }}><span /></div><small>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</small></div>)}</div>
  </div>
}

function WorkoutsPage({ onStart, onCoach }) {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'At home', 'Outdoors', 'Gym']
  const shown = filter === 'All' ? workouts : workouts.filter((item) => item.kind === filter)
  return <>
    <PageHeading eyebrow="FIND YOUR FLOW" title={<>Move in a way<br />that <span>works for you.</span></>} subtitle="Good movement meets you where you are." />
    <section className="workout-feature"><div className="workout-feature-image"><img src={workouts[0].image} alt="At-home workout" /><span className="image-tag">AFRIFIT PICK</span></div><div className="workout-feature-copy"><div className="eyebrow">NO EQUIPMENT NEEDED</div><h2>A stronger you,<br />one session at a time.</h2><p>Thoughtful workouts for busy days, small spaces, and every level of experience.</p><button className="button button-dark" onClick={() => onStart(workouts[0])}>Start a 20-min session <ArrowRight size={16} /></button></div></section>
    <div className="section-line workout-heading"><div><h2>Find your session</h2><span>Pick what feels right today</span></div></div>
    <div className="filter-row" role="tablist" aria-label="Filter workouts">{filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? 'filter-active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
    <section className="workout-grid">{shown.map((item) => <article className="workout-card" key={item.id}><div className="workout-thumb"><img src={item.image} alt="" /><span>{item.kind}</span></div><div className="workout-card-body"><div className="workout-meta"><span>{item.level}</span><span><Clock3 size={13} /> {item.minutes} min</span><span><Flame size={13} /> {item.kcal} kcal</span></div><h3>{item.title}</h3><p>{item.description}</p><button className="button button-outline button-full" onClick={() => onStart(item)}>View session <ArrowRight size={15} /></button></div></article>)}</section>
    <div className="coach-nudge"><span className="coach-nudge-icon"><Sparkles size={18} /></span><div><strong>Not sure what to do?</strong><span>Tell your coach how you’re feeling today.</span></div><button onClick={onCoach}>Ask AFRIFIT Coach <ArrowRight size={15} /></button></div>
  </>
}

function WorkoutPlayer({ workout, onFinish, onClose }) {
  const [index, setIndex] = useState(-1)
  const [paused, setPaused] = useState(true)
  const [seconds, setSeconds] = useState(workout.minutes * 60)
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (paused || done) return undefined
    const timer = window.setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [paused, done])
  useEffect(() => { if (seconds === 0) setDone(true) }, [seconds])
  const current = index >= 0 ? workout.exercises[index] : 'Take a breath. You’ve got this.'
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')
  function advance() {
    if (index >= workout.exercises.length - 1) setDone(true)
    else setIndex((value) => value + 1)
  }
  return <section className="player-screen">
    <div className="player-top"><button className="icon-button" aria-label="Close workout" onClick={onClose}><X size={19} /></button><span>SESSION IN PROGRESS</span><span className="player-count">{Math.max(index + 1, 0)} / {workout.exercises.length}</span></div>
    {done ? <div className="player-finish"><span className="finish-mark"><Check size={32} /></span><div className="eyebrow">THAT’S A WRAP</div><h1>Beautiful work.</h1><p>You made time for yourself today. Let that count.</p><div className="finish-stats"><span><Clock3 size={16} /> {workout.minutes} min</span><span><Flame size={16} /> {workout.kcal} kcal</span></div><button className="button button-dark" onClick={onFinish}>Finish session <ArrowRight size={16} /></button></div> : <div className="player-content">
      <div className="player-photo"><img src={workout.image} alt="" /><div className="player-photo-overlay" /><span className="player-move">{index < 0 ? 'GET READY' : `MOVE ${index + 1}`}</span><div className="timer-display">{mins}<i>:</i>{secs}</div><p className="player-current">{current}</p><div className="player-progress"><span style={{ width: `${(Math.max(index + 1, 0) / workout.exercises.length) * 100}%` }} /></div></div>
      <div className="player-controls"><button className="button button-outline" onClick={() => setPaused((value) => !value)}>{paused ? 'Start timer' : 'Pause'}</button><button className="button button-dark" onClick={advance}>{index >= workout.exercises.length - 1 ? 'Finish workout' : 'Next move'} <ArrowRight size={16} /></button></div>
      <div className="exercise-list"><div className="eyebrow">YOUR SESSION</div>{workout.exercises.map((exercise, i) => <div className={`exercise-item ${i === index ? 'exercise-current' : ''}`} key={exercise}><span className="exercise-number">{i < index ? <Check size={14} /> : String(i + 1).padStart(2, '0')}</span><span>{exercise}</span></div>)}</div>
    </div>}
  </section>
}

function NutritionPage({ meals, calories, protein, onAdd }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [mealType, setMealType] = useState('Snack')
  const [showPicker, setShowPicker] = useState(false)
  const categories = ['All', 'Rice', 'Legumes', 'Soups', 'Protein', 'Tubers', 'Drinks']
  const filtered = foods.filter((food) => (category === 'All' || food.category === category) && food.name.toLowerCase().includes(query.toLowerCase()))
  return <>
    <PageHeading eyebrow="GOOD FOOD, GOOD ENERGY" title={<>Eat well. Feel <span>well.</span></>} subtitle="Everyday Nigerian food, logged your way." action={<button className="button button-dark" onClick={() => setShowPicker((open) => !open)}><Plus size={16} /> Add food</button>} />
    <section className="nutrition-summary"><div className="nutrition-total"><div className="eyebrow">TODAY’S INTAKE</div><div className="calorie-number">{calories.toLocaleString()}<small> kcal</small></div><div className="calorie-target">of 2,000 kcal daily target</div><div className="calorie-progress"><span style={{ width: `${Math.min(calories / 2000 * 100, 100)}%` }} /></div></div><div className="macro-stat"><span className="macro-dot protein-dot" /><span>Protein</span><strong>{protein}g</strong><small>Goal 100g</small></div><div className="macro-stat"><span className="macro-dot carb-dot" /><span>Carbs</span><strong>{meals.reduce((sum, item) => sum + Number(item.carbs || 0), 0)}g</strong><small>Goal 250g</small></div><div className="macro-stat"><span className="macro-dot fat-dot" /><span>Fat</span><strong>{meals.reduce((sum, item) => sum + Number(item.fat || 0), 0)}g</strong><small>Goal 70g</small></div></section>
    <div className="nutrition-columns"><section className="panel food-log"><div className="panel-head"><div><div className="eyebrow">YOUR PLATE</div><h3>Today’s food log</h3></div><span className="log-count">{meals.length} items</span></div>{['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((type) => { const items = meals.filter((food) => food.meal === type); return <div className="meal-group" key={type}><div className="meal-group-title"><strong>{type}</strong><span>{items.reduce((total, item) => total + Number(item.calories || 0), 0)} kcal</span></div>{items.length ? items.map((food) => <div className="logged-food" key={food.id}><span className="food-emoji">{food.emoji}</span><span className="logged-food-name"><strong>{food.name}</strong><small>{food.protein}g protein · {food.carbs}g carbs</small></span><span className="food-kcal">{food.calories}<small> kcal</small></span></div>) : <button className="empty-meal" onClick={() => { setMealType(type); setShowPicker(true) }}><Plus size={14} /> Add something to {type.toLowerCase()}</button>}</div>})}</section>
      <section className="panel food-finder"><div className="panel-head"><div><div className="eyebrow">MADE FOR YOUR TABLE</div><h3>Find a food</h3></div><span className="food-spark">✳</span></div><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Nigerian foods" /></label><div className="food-categories">{categories.map((item) => <button key={item} className={category === item ? 'category-selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="food-results">{filtered.map((food) => <div className="food-result" key={food.name}><span className="food-emoji">{food.emoji}</span><span className="food-result-name"><strong>{food.name}</strong><small>{food.calories} kcal · {food.category}</small></span><button aria-label={`Add ${food.name}`} onClick={() => onAdd({ ...food, meal: mealType })}><Plus size={16} /></button></div>)}{!filtered.length && <p className="no-results">No foods found. Try another search.</p>}</div><div className="meal-select"><label htmlFor="meal-type">Add to</label><select id="meal-type" value={mealType} onChange={(event) => setMealType(event.target.value)}>{['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((item) => <option key={item}>{item}</option>)}</select></div>{showPicker && <div className="picker-note"><Check size={14} /> Choose any food above to add it to your log.<button onClick={() => setShowPicker(false)} aria-label="Dismiss"><X size={14} /></button></div>}</section></div>
  </>
}

function CommunityPage({ posts, liked, onLike }) {
  const [draft, setDraft] = useState('')
  const [localPosts, setLocalPosts] = useState([])
  const [joined, setJoined] = useState(false)
  function publish() {
    if (!draft.trim()) return
    setLocalPosts((items) => [{ id: Date.now(), name: 'Chika N.', place: 'Lagos', time: 'Just now', text: draft.trim(), likes: 0, emoji: '💬', color: 'mint' }, ...items])
    setDraft('')
  }
  return <>
    <PageHeading eyebrow="BETTER, TOGETHER" title={<>Your people,<br /><span>your pace.</span></>} subtitle="A little encouragement goes a long way." action={<button className="button button-outline hide-small"><Trophy size={16} /> Leaderboard</button>} />
    <section className="community-banner"><div className="community-banner-copy"><span className="community-spark">✳</span><div className="eyebrow">THIS WEEK’S CHALLENGE</div><h2>Move a little,<br />every day.</h2><p>Join 1,240 people building a 7-day walking habit.</p><button className={joined ? 'joined' : ''} aria-pressed={joined} onClick={() => setJoined((value) => !value)}>{joined ? 'Joined' : 'Join the challenge'} <ArrowRight size={15} /></button></div><div className="community-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="art-sun">✳</span><span className="art-step">7<span>days</span></span><span className="art-label">WALKING CLUB</span></div></section>
    <div className="community-layout"><section><div className="section-line community-feed-heading"><div><h2>Community feed</h2><span>Real people, real progress</span></div><button className="select-button">Latest <ChevronDown size={14} /></button></div><div className="compose-box"><div className="avatar">C</div><div className="compose-main"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Share a win, a question, or a little encouragement…" rows="2" /><div className="compose-footer"><span>Good vibes only <Heart size={13} /></span><button className="button button-dark" disabled={!draft.trim()} onClick={publish}>Post <Send size={14} /></button></div></div></div><div className="post-list">{[...localPosts, ...posts].map((post) => <article className="post-card" key={post.id}><div className="post-head"><div className={`avatar avatar-${post.color}`}>{post.name.charAt(0)}</div><div className="post-by"><strong>{post.name}</strong><span>{post.place} <i>·</i> {post.time}</span></div><button className="post-more" aria-label="More options">···</button></div><p>{post.text}</p><div className="post-actions"><button onClick={() => onLike(post.id)} className={liked.includes(post.id) ? 'is-liked' : ''}><Heart size={17} fill={liked.includes(post.id) ? 'currentColor' : 'none'} /> {post.likes + (liked.includes(post.id) ? 1 : 0)}</button><button><MessageCircle size={17} /> Reply</button><span>{post.emoji}</span></div></article>)}</div></section><aside className="community-aside"><div className="panel leaderboard-panel"><div className="panel-head"><div><div className="eyebrow">SHOWING UP</div><h3>Your circle</h3></div><Users size={18} className="aside-icon" /></div>{[['AM', 'Amaka', '5 sessions'], ['TO', 'Tomi', '4 sessions'], ['YOU', 'You', '2 sessions'], ['KO', 'Kola', '2 sessions']].map(([initials, name, detail], index) => <div className={`leader-row ${name === 'You' ? 'leader-you' : ''}`} key={name}><span className={`leader-avatar leader-${index}`}>{initials}</span><span><strong>{name}</strong><small>{detail}</small></span>{index < 2 && <span className="leader-rank">0{index + 1}</span>}</div>)}<button className="text-button full-link">View all members <ArrowRight size={14} /></button></div><div className="community-note"><Sparkles size={17} /><p><strong>Progress isn’t linear.</strong><br />Rest days, fresh starts, and tiny wins all belong here.</p></div></aside></div>
  </>
}

function CoachPage() {
  const [messages, setMessages] = useState([{ from: 'coach', text: 'Ẹ káàbọ̀, Chika! I’m here for the real-life version of fitness. What would feel good for you today?' }])
  const [draft, setDraft] = useState('')
  function send() {
    const text = draft.trim()
    if (!text) return
    setMessages((items) => [...items, { from: 'you', text }, { from: 'coach', text: 'That makes sense. Start small and keep it kind: try a 10-minute walk, drink some water, and choose a meal that keeps you satisfied. You’ve got this.' }])
    setDraft('')
  }
  return <>
    <PageHeading eyebrow="YOUR PERSONAL CHEER SQUAD" title={<>Meet your <span>coach.</span></>} subtitle="A thoughtful nudge, whenever you need one." />
    <section className="coach-layout"><aside className="coach-intro"><span className="coach-avatar"><Sparkles size={26} /></span><div className="eyebrow">AFRIFIT COACH</div><h2>Fitness that fits<br />your real life.</h2><p>Ask about movement, meals, motivation, or finding a routine that works for your day.</p><div className="coach-tags"><span>Workout ideas</span><span>Naija meals</span><span>Gentle motivation</span></div><small>Demo coach · responses are sample guidance</small></aside><div className="chat-panel"><div className="chat-header"><div className="coach-dot" /><div><strong>AFRIFIT Coach</strong><span>Here to help you move well</span></div><Sparkles size={18} /></div><div className="chat-messages">{messages.map((message, index) => <div key={index} className={`chat-message ${message.from === 'you' ? 'chat-you' : ''}`}><span className="chat-avatar">{message.from === 'you' ? 'C' : <Sparkles size={14} />}</span><p>{message.text}</p></div>)}</div><div className="suggestion-row">{['Give me a quick workout', 'What can I eat?'].map((text) => <button key={text} onClick={() => setDraft(text)}>{text}</button>)}</div><form className="chat-compose" onSubmit={(event) => { event.preventDefault(); send() }}><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask your coach anything…" /><button aria-label="Send message" disabled={!draft.trim()}><Send size={17} /></button></form></div></section>
  </>
}

function ProfilePage({ finished, water, meals }) {
  const [name, setName] = useSavedState('afrifit-name', 'Chika Nwosu')
  const [goal, setGoal] = useSavedState('afrifit-goal', 'Feel healthier every day')
  const [editing, setEditing] = useState(false)
  return <>
    <PageHeading eyebrow="YOUR JOURNEY" title={<>This is <span>your story.</span></>} subtitle="Notice how far you’ve come, then keep going." action={<button className="button button-outline" onClick={() => setEditing((value) => !value)}><Settings2 size={16} /> {editing ? 'Done' : 'Edit profile'}</button>} />
    <section className="profile-hero"><div className="profile-avatar">{name.charAt(0)}</div><div className="profile-identity">{editing ? <input aria-label="Your name" value={name} onChange={(event) => setName(event.target.value)} /> : <h2>{name}</h2>}<span><span className="online-dot" /> Lagos, Nigeria · Member since 2026</span></div><div className="profile-level"><span>YOUR LEVEL</span><strong>Level 2 <i>·</i> Starter</strong><div className="level-track"><span /></div><small>180 / 300 XP to Mover</small></div></section>
    <div className="section-line"><div><h2>Your progress</h2><span>Every small step counts</span></div><span className="range-label">LAST 30 DAYS <ChevronDown size={13} /></span></div>
    <section className="profile-stats"><StatCard icon={Dumbbell} label="Workouts completed" value={finished} note="Keep your rhythm" theme="green" /><StatCard icon={Waves} label="Water logged today" value={`${water.toLocaleString()} ml`} note="You’re doing great" theme="aqua" /><StatCard icon={Apple} label="Meals logged" value={meals} note="Fuel your movement" theme="orange" /><StatCard icon={Flame} label="Current streak" value="4 days" note="Personal best: 12" theme="blue" /></section>
    <section className="panel goals-panel"><div className="panel-head"><div><div className="eyebrow">YOUR NORTH STAR</div><h3>What I’m working toward</h3></div><span className="goal-icon"><Sparkles size={17} /></span></div>{editing ? <input className="goal-input" aria-label="Fitness goal" value={goal} onChange={(event) => setGoal(event.target.value)} /> : <p>{goal}</p>}<div className="goal-chips"><span>Move 4 days a week</span><span>Drink more water</span><span>Enjoy my food</span></div></section>
    <div className="profile-footer"><span>AFRIFIT</span><span>Made for your everyday.</span><button onClick={() => { ['afrifit-water', 'afrifit-meals', `afrifit-water-${localDayKey()}`, `afrifit-meals-${localDayKey()}`, 'afrifit-workouts', 'afrifit-name', 'afrifit-goal'].forEach((key) => localStorage.removeItem(key)); window.location.reload() }}>Reset demo data</button></div>
  </>
}
