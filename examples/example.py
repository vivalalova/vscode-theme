"""
Python Example
Demonstrates syntax highlighting
"""

from typing import Optional, List, Dict, TypeVar, Generic
from dataclasses import dataclass, field
from abc import ABC, abstractmethod
import asyncio
import re

# Constants
MAX_RETRIES: int = 3
PI: float = 3.14159
HEX_VALUE: int = 0xFF
IS_ENABLED: bool = True
NONE_VALUE = None

# Type variable
T = TypeVar("T")


# Dataclass
@dataclass
class User:
    """Represents a user in the system."""

    id: int
    name: str
    email: Optional[str] = None
    tags: List[str] = field(default_factory=list)

    def __post_init__(self) -> None:
        self.name = self.name.strip()


# Abstract class
class Repository(ABC, Generic[T]):
    """Abstract repository interface."""

    @abstractmethod
    async def find(self, id: int) -> Optional[T]:
        pass

    @abstractmethod
    async def save(self, item: T) -> None:
        pass


# Concrete implementation
class UserRepository(Repository[User]):
    def __init__(self) -> None:
        self._storage: Dict[int, User] = {}

    async def find(self, id: int) -> Optional[User]:
        return self._storage.get(id)

    async def save(self, item: User) -> None:
        self._storage[item.id] = item

    @property
    def count(self) -> int:
        return len(self._storage)


# Function with decorators
def retry(max_attempts: int = 3):
    """Decorator for retry logic."""

    def decorator(func):
        async def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    await asyncio.sleep(2**attempt)

        return wrapper

    return decorator


@retry(max_attempts=3)
async def fetch_data(url: str) -> dict:
    """Fetch data from URL."""
    # Simulated fetch
    await asyncio.sleep(0.1)
    return {"status": "ok", "url": url}


# List comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers if x > 2]

# Dictionary comprehension
mapping = {k: v for k, v in enumerate(["a", "b", "c"])}

# Generator expression
gen = (x * 2 for x in range(10))

# Lambda
multiply = lambda a, b: a * b

# F-string
name = "Alice"
message = f"Hello, {name}! You have {len(squares)} items."

# Raw string (regex)
email_pattern = re.compile(r"^[\w.-]+@[\w.-]+\.\w+$")

# Multi-line string
query = """
SELECT id, name, email
FROM users
WHERE active = true
ORDER BY created_at DESC
"""

# Context manager
class Timer:
    def __enter__(self):
        self.start = asyncio.get_event_loop().time()
        return self

    def __exit__(self, *args):
        self.elapsed = asyncio.get_event_loop().time() - self.start


# Main
async def main() -> None:
    repo = UserRepository()
    user = User(id=1, name="Bob", email="bob@example.com")
    await repo.save(user)

    found = await repo.find(1)
    if found:
        print(f"Found user: {found.name}")


if __name__ == "__main__":
    asyncio.run(main())
