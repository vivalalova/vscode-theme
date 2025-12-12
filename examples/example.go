// Package main demonstrates syntax highlighting for Go
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"sync"
	"time"
)

// Constants
const (
	MaxRetries   = 3
	DefaultPort  = 8080
	PI           = 3.14159
	HexValue     = 0xFF
	EnabledFlag  = true
)

// Custom error
var (
	ErrNotFound     = errors.New("not found")
	ErrUnauthorized = errors.New("unauthorized")
)

// User represents a user in the system
type User struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

// Repository interface for data access
type Repository[T any] interface {
	Find(ctx context.Context, id int64) (T, error)
	Save(ctx context.Context, item T) error
	Delete(ctx context.Context, id int64) error
}

// UserRepository implements Repository for User
type UserRepository struct {
	mu      sync.RWMutex
	storage map[int64]User
}

// NewUserRepository creates a new UserRepository
func NewUserRepository() *UserRepository {
	return &UserRepository{
		storage: make(map[int64]User),
	}
}

// Find retrieves a user by ID
func (r *UserRepository) Find(ctx context.Context, id int64) (User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	user, ok := r.storage[id]
	if !ok {
		return User{}, ErrNotFound
	}
	return user, nil
}

// Save stores a user
func (r *UserRepository) Save(ctx context.Context, user User) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.storage[user.ID] = user
	return nil
}

// Delete removes a user
func (r *UserRepository) Delete(ctx context.Context, id int64) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	delete(r.storage, id)
	return nil
}

// fetchData fetches JSON data from a URL
func fetchData[T any](ctx context.Context, url string) (T, error) {
	var result T

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return result, fmt.Errorf("create request: %w", err)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return result, fmt.Errorf("execute request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return result, fmt.Errorf("read body: %w", err)
	}

	if err := json.Unmarshal(body, &result); err != nil {
		return result, fmt.Errorf("unmarshal: %w", err)
	}

	return result, nil
}

// worker processes items from a channel
func worker(ctx context.Context, id int, jobs <-chan int, results chan<- int) {
	for {
		select {
		case <-ctx.Done():
			return
		case job, ok := <-jobs:
			if !ok {
				return
			}
			// Process job
			results <- job * 2
		}
	}
}

// fibonacci generates Fibonacci numbers
func fibonacci(n int) int {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	repo := NewUserRepository()

	user := User{
		ID:        1,
		Name:      "Alice",
		Email:     "alice@example.com",
		CreatedAt: time.Now(),
	}

	if err := repo.Save(ctx, user); err != nil {
		fmt.Printf("Error saving user: %v\n", err)
		return
	}

	found, err := repo.Find(ctx, 1)
	if err != nil {
		fmt.Printf("Error finding user: %v\n", err)
		return
	}

	fmt.Printf("Found user: %s (%s)\n", found.Name, found.Email)

	// Slice operations
	numbers := []int{1, 2, 3, 4, 5}
	doubled := make([]int, 0, len(numbers))
	for _, n := range numbers {
		if n > 2 {
			doubled = append(doubled, n*2)
		}
	}

	// Map operations
	config := map[string]any{
		"host":    "localhost",
		"port":    8080,
		"enabled": true,
	}

	for key, value := range config {
		fmt.Printf("%s: %v\n", key, value)
	}
}
